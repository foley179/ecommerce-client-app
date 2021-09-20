import React from "react"
import { Link } from "react-router-dom"

export default function Cart(props) {
    const {cartItems, onAdd, onRemove} = props
    const itemsPrice = cartItems.reduce((acc, cur) => acc + (cur.price * cur.qty), 0)
    const shippingPrice = itemsPrice > 1999 ? 0 : 30
    const totalPrice = itemsPrice + shippingPrice

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
                        {item.qty} x £{item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length > 0 && (
                <>
                <hr />
                <div className="row">
                    <div className="col-1">Cart total</div>
                    <div className="col-2 text-right">£{itemsPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-1">Shipping</div>
                    <div className="col-2 text-right">£{shippingPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="col-1"><strong>Total</strong></div>
                    <div className="col-2 text-right"><strong>£{totalPrice.toFixed(2)}</strong></div>
                </div>
                <Link to="/checkout">
                    <div className="row">
                        <button className="button">Checkout</button>
                    </div>
                </Link>
                </>
            )}
        </aside>
    )
}