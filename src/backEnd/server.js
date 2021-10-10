// unsure why but 'import' is causing errors when loading this server.js
const express = require('express')
const cors = require('cors')
const Stripe = require('stripe')
const {v4 : uuidv4} = require('uuid')
const sanitizeMiddleware = require("sanitize-middleware")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("./pool")

if (process.env.NODE_ENV !== "production") {
    // use .env if in development state
    require('dotenv').config()
}

const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY_SECRET) // setup stripe connection

const app = express() // setup express 

// middlewares
app.use(cors())
app.use(sanitizeMiddleware())
app.use(express.json())

// helper funcs
async function hashAndSalt(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

async function compareHash(password, hash) {
    return await bcrypt.compare(password, hash)
}

// routes

// products
app.get("/products", async (req, res) => {
    // get products for <main>
    try {
        const products = await pool.query("SELECT * FROM products")
        res.json(products.rows)
    } catch (error) {
        console.error(error.message)
        res.status(400).send(error.message)
    }
})

// users
app.post("/users/create", async (req, res) => {
    // create user
    console.log("users/create") // testing
    const user = req.body
    let exist
    try {
        exist = await pool.query("SELECT email FROM users WHERE $1 = users.email", [user.email])
    } catch (error) {
        res.send(404).send(error.message)
    }

    if (exist.rows[0]) {
        res.status(400).send("user with that email exists")
    } else {
        try {
            const hashedPw = await hashAndSalt(user.password)
            const newUser = await pool.query(
                "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING username, email",
                [user.username, user.email, hashedPw]
            )
            res.send(newUser.rows)
        } catch (error) {
            res.status(400).send("error creating user try again")
        }
    }
})

app.post("/users/login", async (req, res) => {
    // TODO: refactor this, a check if user exists should be done before retreiving password
    // check pw and retreive user
    console.log("users/login") //testing
    // TODO: verify stored hash exists
    const storedHash = await pool.query(
        "SELECT password FROM users WHERE email = $1",
        [req.body.email]
    )
    const authenticate = await compareHash(req.body.password, storedHash.rows[0].password)

    if (authenticate) {
        const user = await pool.query(
            "SELECT username, email FROM users WHERE $1 = users.email", 
            [req.body.email]
        )
        if (user.rows[0]) {
            res.send(user.rows)
        } else {
            res.send(new Error("error retreiving user"))
        }
    } else {
        res.send(new Error("login attempt failed"))
    }
})

app.put("/users/update", async (req, res) => {
    console.log("users/update") // testing
    // update users info
    const currUser = req.body.currUser
    const updatedUserDetails = req.body
    let currUserId, updatedUser, hashedPw

    try {
        if (updatedUserDetails.password !== "") {
            hashedPw = await hashAndSalt(updatedUserDetails.password)
        }
        currUserId = await pool.query("SELECT id FROM users WHERE email = $1", [currUser.email])
    } catch (error) {
        res.send(error.message)
    }

    try {
        if (updatedUserDetails.username !== "" && updatedUserDetails.password !== "") { // both changed
            updatedUser = await pool.query(
                "UPDATE users SET username = $1 AND password = $2 WHERE id = $3 RETURNING username, email",
                [updatedUserDetails.username, hashedPw, currUserId.rows[0].id]
            ) 
        } else if (updatedUserDetails.username !== "") { // new username only
            updatedUser = await pool.query(
                "UPDATE users SET username = $1 WHERE id = $2 RETURNING username, email",
                [updatedUserDetails.username, currUserId.rows[0].id]
            ) 
        } else if (updatedUserDetails.password !== "") { // new password only
            updatedUser = await pool.query(
                "UPDATE users SET password = $1 WHERE id = $2 RETURNING username, email",
                [hashedPw, currUserId.rows[0].id]
            ) 
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
    res.send(updatedUser.rows)
})

// password reset routes
app.post("/forgot-password", async (req, res) => {
    const {email} = req.body
    let exist
    try {
        exist = await pool.query("SELECT id, email, password FROM users WHERE $1 = users.email", [email])
        if (exist.rows[0]) {
            const jwtSecret = process.env.REACT_APP_JWT_SECRET + exist.rows[0].password
            const payload = {
                email: email,
                id: exist.rows[0].id
            }
            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: "15m"
            })
            const link = `HTTP://localhost:3000/resetPassword/${exist.rows[0].id}/${token}`
            // TODO: send email here
            console.log(link) // link will show inconsole to click on for testing
            res.send("Password link has been sent, check your emails")
        } else {
            throw new Error("No user with that email")
        }
    } catch (error) {
        res.send(404).send(error.message)
    }
})

app.post("/reset-password", async (req, res) => {
    const {password, id, token} = req.body

    let user
    const exist = await pool.query("SELECT email, password FROM users WHERE $1 = id", [id])

    if (exist.rows[0]) {
        const jwtSecret = process.env.REACT_APP_JWT_SECRET + exist.rows[0].password
        try {
            jwt.verify(token, jwtSecret)
            const hashedPassword = await hashAndSalt(password)
            user = await pool.query(
                "UPDATE users SET password = $1 WHERE id = $2 RETURNING username, email",
                [hashedPassword, id]
            )
            if (!user.rows[0]) {
                throw new Error("Error updating password please try again")
            } else {
                res.send(user.rows)
            }
        } catch (error) {
            console.log(error.message) // testing
            res.status(404).send(error.message)
        }
    } else {
        res.status(404).send("no user with that id")
    }
})

// checkout
app.post("/checkout", async (req, res) => {
    // route for stripe checkout to run
    console.log("/checkout") // testing

    let error
    let status
    try {
        const {totalPrice, cartItems, token} = req.body

        // for description in" charges info" on stripe account (used below)
        let description = ""
        if (cartItems.length === 1) {
            description = cartItems[0].name
        } else if (cartItems.length > 1) {
            description = "Multiple items"
        }

        // create a customer (details can be found on your stripe account after purchase)
        // currently creating dupes TODO: must fix
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const idempotencyKey = uuidv4() // prevents user being charged twice
        // create the charge sent to users card
        const charge = await stripe.charges.create({
            amount: totalPrice,
            currency: "GBP",
            customer: customer.id,
            receipt_email: token.email,
            description: description,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            }
        }, { // 2nd arg to stripe.charges.create, sending the uuid
            idempotencyKey
        })
        console.log("charge: ", charge)
        status = "success"
    } catch (error) {
        console.log("error: ", error)
        status = "failure"
    }
    res.json({status, error})
})

app.listen(4000, () => console.log("Simple server running on http://localhost:4000"))