import {useRef, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function Login() {
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

    // functions
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/profile")
            console.log("login successful") // testing
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="block col-2 login">
            <h2>Login</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                {error !== null ? <div className="loginError">{error}</div> : ""}
                <input type="email" placeholder="Enter Your Email" className="txt" required ref={emailRef} />
                <input type="password" placeholder="Enter Your Password" className="txt" required ref={passwordRef} />
                <button type="submit" className="loginbutton button">Login</button>
                <Link to="/signup"> <button className="loginbutton button">No Account? Sign Up</button></Link>
                <Link to="/pwReset"> <button className="loginbutton button">Forgot Your Password?</button></Link>
            </form>
        </div>
    )
}
