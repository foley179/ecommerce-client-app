import React from "react"

export default function Header(props) {
    return (
        <header className="row center block">
            <div>
                <a href="/">
                    <h1>Small Shopping Cart</h1>
                </a>
            </div>
            <div>
                <a href="/login">Login</a> <a href="/Cart">Cart</a>
            </div>
        </header>
    )
}