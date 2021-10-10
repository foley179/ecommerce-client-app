import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/authcontext'

export default function PwReset() {
    const {forgotPassword} = useAuth()
    const [error, setError] = useState(null)
    const [emailSent, setEmailSent] = useState(false)
    const emailRef = useRef()
    
    // functions
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await forgotPassword(emailRef.current.value)
            setEmailSent(true)
        } catch (error) {
            setError("Error sending email. Please try again")
        }
        console.log("Sending Email") // testing
    }

    if (emailSent) {
        return (
            <div className="block col-2 login">
                <h2>Password Reset</h2>
                <hr />
                <h2>Email sent, please check your emails</h2>
            </div>
        )
    } else {
        return (
            <div className="block col-2 login">
                <h2>Password Reset</h2>
                <hr />
                <form onSubmit={handleSubmit} >
                    {error !== null ? <div className="loginError">{error}</div> : ""}
                    <input type="email" placeholder="Enter Your Email" className="txt" required ref={emailRef} />
                    <button type="submit" className="loginbutton button">Send Email</button>
                </form>
            </div>
        )
    }
}
