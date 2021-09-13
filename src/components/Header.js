import {Link, useHistory} from "react-router-dom"
import { useAuth } from "../contexts/authcontext"

export default function Header() {
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    // functions
    async function handleLogout(e) {
        e.preventDefault()
        try {
            history.push("/") // causes error if called after logout
            await logout()
            console.log("logout successful") // testing
        } catch (err) {
            // using log because error is not showing
            console.log("logout unsuccessful")
        }
    }

    return (
        <header className="row block">
            <div>
                <Link to="/">
                    <h1>Small Shopping Cart</h1>
                </Link>
            </div>
            <div className="center">
                {!currentUser ?
                <>
                    <Link to="/signup"><button className="headerButton">Sign Up</button></Link>
                    <Link to="/login"><button className="headerButton">Log In</button></Link>
                </>
                :
                <>
                    <Link to="/profile"><button className="headerButton">Profile</button></Link>
                    <button onClick={(e) => handleLogout(e)} className="headerButton">Log Out</button>
                </>
                }
            </div>
        </header>
    )
}