import React, { useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useAuth } from '../contexts/authcontext'

export default function ResetPassword() {
    const {updatePassword} = useAuth()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState(null)
    const history = useHistory()
    const location = useLocation()

    // verifies a token and id are preset (full verify in useContext)
    const id = location.pathname.split("/")[2]
    const token = location.pathname.split("/")[3]
    if (!id || !token) {
        history.push("/")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("passwords do not match")
            return
        }
        try {
            await updatePassword(passwordRef.current.value, id, token)
            setError("Password change successful")
            history.push("/profile")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="block col-2 login">
            <h2>Password Reset</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                {error !== null ? <div className="loginError">{error}</div> : ""}
                <input type="password" placeholder="Enter Your Password" className="txt" required ref={passwordRef} />
                <input type="password" placeholder="Re-Enter Your Password" className="txt" required ref={passwordConfirmRef} />
                <button type="submit" className="loginbutton button">Change Password</button>
            </form>
        </div>
    )
}
