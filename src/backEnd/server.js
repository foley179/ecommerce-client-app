//import express from 'express'
//import cors from 'cors'
//import Stripe from 'stripe'
//import uuid from 'uuid/v4'
// unsure why but import are causing errors when loading this server
const express = require('express')
const cors = require('cors')
const Stripe = require('stripe')
const {v4 : uuidv4} = require('uuid')

if (process.env.NODE_ENV !== "production") {
    // use .env if in development state
    require('dotenv').config()
}

const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY_SECRET) // setup stripe connection

const app = express() // setup express 

// middlewares
app.use(cors())
app.use(express.json())

//routes
app.get("/", (req, res) => {
    // for testing
    console.log("get request")
})

app.post("/checkout", async (req, res) => {
    console.log("Request: ", req.body)

    let error
    let status
    try {
        const {totalPrice, cartItems, token} = req.body

        // for description in charges info (below)
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