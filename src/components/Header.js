import React from "react"

export default function Header(props) {
    const {cartQty, changeLoginTab} = props
    return (
        <header className="row block">
            <div>
                <a href="/">
                    <h1>Small Shopping Cart</h1>
                </a>
            </div>
            <div className="center">
                {/* add logout button & logic */}
                <button onClick={(e) => changeLoginTab(e)} id="loginButton" className="headerButton">Login</button>
                <button className="headerButton">
                    Cart {
                        cartQty === 0 ? " " : <div className="badge">{cartQty}</div>
                    }
                </button>
            </div>
        </header>
    )
}