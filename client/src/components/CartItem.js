import React from "react"

export default function CartItem(props) {
    const {item} = props
    return (
        <div>
            <div>{} x{item.qty}</div>
            <div>
                <button>-</button>
                <button>+</button>
            </div>
        </div>
    )
}