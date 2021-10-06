import React from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from 'axios'
import { useHistory } from "react-router"

if (process.env.NODE_ENV !== "production") {
    // use .env if in development state
    require('dotenv').config()
}

export default function Cart(props) {
    const history = useHistory()
    const {cartItems, onAdd, onRemove, emptyCart} = props
    const itemsPrice = cartItems.reduce((acc, cur) => acc + (cur.price * cur.qty), 0)
    const shippingPrice = itemsPrice > 199900 ? 0 : 3000
    const totalPrice = itemsPrice + shippingPrice

    //functions
    async function handleToken(token) { // 2nd arg can be addresses but they are sent in the token in this project
        // creates a post request to the server
        const response = await axios.post("http://localhost:4000/checkout", {
            token,
            cartItems,
            totalPrice
        })
        // retreive status from the response
        const {status} = response.data
        if (status === "success") {
            emptyCart()
            history.push("/success")
        } else {
            history.push("/failed")
        }
    }

    return (
        <aside className="block col-1">
            <h2>Cart Items</h2>
            {cartItems.length === 0 && <div>Cart Is Empty</div>}
            {cartItems.map((item) => (
                <div className="row" key={item.id} >
                    <div className="col-2">{item.name}</div>
                    <div className="col-2">
                        <button className="remove button" onClick={() => {onRemove(item)} }>-</button>
                        <button className="add button" onClick={() => {onAdd(item)} }>+</button>
                    </div>
                    <div className="col-2 text-right">
                        {item.qty} x £{(item.price / 100).toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length > 0 && (
                <>
                <hr />
                <div className="row">
                    <div className="col-1">Cart total</div>
                    <div className="col-2 text-right">£{(itemsPrice / 100).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-1">Shipping</div>
                    <div className="col-2 text-right">£{(shippingPrice / 100).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-1"><strong>Total</strong></div>
                    <div className="col-2 text-right"><strong>£{(totalPrice / 100).toFixed(2)}</strong></div>
                </div>

                {/* stripeKey and token are Required here, billing/shipping address creates the form fields, token is whats
                    returned when the user submits their data */}
                <StripeCheckout 
                    stripeKey={process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE}
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    amount={totalPrice}
                    className="button"
                />
                </>
            )}
        </aside>
    )
}