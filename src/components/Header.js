import {Link} from "react-router-dom"

export default function Header() {
    return (
        <header className="row block">
            <div>
                <Link to="/">
                    <h1>Small Shopping Cart</h1>
                </Link>
            </div>
            <div className="center">
                {/* add logout button & logic */}
                <Link to="/signup"><button id="loginButton" className="headerButton">Signup</button></Link>
                <Link to="/login"><button id="loginButton" className="headerButton">Login</button></Link>
            </div>
        </header>
    )
}