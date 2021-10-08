// unsure why but 'import' is causing errors when loading this server.js
const express = require('express')
const cors = require('cors')
const Stripe = require('stripe')
const {v4 : uuidv4} = require('uuid')
const sanitizeMiddleware = require("sanitize-middleware")
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

function hash_and_salt() {
    // for passwords
}

// routes

// products
app.get("/products", async (req, res) => {
    // get products for <main>
    console.log("get request") // for testing
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
    // TODO: hash PW BEFORE saving
    const user = req.body
    const exist = await pool.query("SELECT email FROM users WHERE $1 = users.email", [user.email])

    if (exist.rows[0]) {
        console.log("users/create user exists")
        res.status(400).send("user exists")
    } else {
        try {
            const newUser = await pool.query(
                "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING username, email",
                [user.username, user.email, user.password]
            )
            res.send(newUser.rows)
        } catch (error) {
            res.status(400).send("error creating user try again")
        }
    }
})

app.post("/users/login", async (req, res) => {
    // check pw and retreive user
    // TODO: create hash & salt func and hash the pw BEFORE checking
    const user = await pool.query(
        "SELECT username, email FROM users WHERE $1 = users.email AND $2 = users.password", 
        [req.body.email, req.body.password]
    )
    if (user.rows[0]) {
        res.send(user.rows)
    } else {
        res.send(new Error("error retreiving user"))
    }
})

app.put("/users/update", async (req, res) => {
    console.log("users/update")
    // update users info
    const currUser = req.body.currUser
    const updatedUserDetails = req.body
    let currUserId
    let updatedUser

    try {
        currUserId = await pool.query("SELECT id FROM users WHERE email = $1", [currUser.email])
    } catch (error) {
        console.log(error.message)
        return
    }

    try {
        if (updatedUserDetails.username !== "" && updatedUserDetails.password !== "") { // both changed
            updatedUser = await pool.query(
                "UPDATE users SET username = $1 AND password = $2 WHERE id = $3 RETURNING username, email",
                [updatedUserDetails.username, updatedUserDetails.password, currUserId.rows[0].id]
            ) 
        } else if (updatedUserDetails.username !== "") { // new username only
            updatedUser = await pool.query(
                "UPDATE users SET username = $1 WHERE id = $2 RETURNING username, email",
                [updatedUserDetails.username, currUserId.rows[0].id]
            ) 
        } else if (updatedUserDetails.password !== "") { // new password only
            updatedUser = await pool.query(
                "UPDATE users SET password = $1 WHERE id = $2 RETURNING username, email",
                [updatedUserDetails.password, currUserId.rows[0].id]
            ) 
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
    console.log(updatedUser)
    res.send(updatedUser.rows)
})

// checkout
app.post("/checkout", async (req, res) => {
    // route for stripe checkout to run
    console.log("Request: ", req.body)

    let error
    let status
    try {
        const {totalPrice, cartItems, token} = req.body

        // for description in charges info on stripe account (used below)
        let description = ""
        if (cartItems.length === 1) {
            description = cartItems[0].name
        } else if (cartItems.length > 1) {
            description = "Multiple items"
        }

        // create a customer (details can be found on your stripe account after purchase)
        // currently creating dupes must fix
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