import React, {useRef, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function Signup() {
    const {signup} = useAuth()
    const [error, setError] = useState(null)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()

    // functions
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value || passwordRef.current.value === "") {
            // need to change password empty part
            console.log("passwords do not match")
            setError("passwords do not match")
            return
        }
        try {
            await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
            console.log("signup successful") // testing
            history.push("/profile")
        } catch (err) {
            // using log because error is not showing
            console.log("errormessage: " + err.message)
            setError("login unsuccessful")
        }
    }

    return (
        <div className="block col-2 login">
            <h2>Signup</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                {/* error does not work, cannot currently find work around */}
                {error !== null ? <div className="loginError">{error}</div> : ""}
                <input type="text" placeholder="Enter A Username" className="txt" required ref={usernameRef} />
                <input type="email" placeholder="Enter Your Email" className="txt" required ref={emailRef} />
                <input type="password" placeholder="Enter Your Password" className="txt" required ref={passwordRef} />
                <input type="password" placeholder="Re-Enter Your Password" className="txt" required ref={passwordConfirmRef} />
                <button type="submit" className="loginbutton button">Sign up</button>
                <Link to="/login"> <button className="loginbutton button">Go To Login</button></Link>
            </form>
        </div>
    )
}
