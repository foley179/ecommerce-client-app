import {useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function UpdateProfile() {
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const usernameRef = useRef()
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
            await login(usernameRef.current.value, passwordRef.current.value)
            history.push("/profile")
            console.log("login successful") // testing
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="block col-2 login">
            <h2>Edit Profile</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                {error !== null ? <div className="loginError">{error}</div> : ""}
                <strong>Username: </strong><input type="text" placeholder="Enter A Username" className="txt" required ref={usernameRef} />
                <strong>Password: </strong><input type="password" placeholder="Leave Blank to Keep The Same" className="txt" ref={passwordRef} />
                <strong>Confirm Password: </strong><input type="password" placeholder="Leave Blank to Keep The Same" className="txt" ref={passwordConfirmRef} />
                <button type="submit" className="loginbutton button">Update Profile</button>
            </form>
        </div>
    )
}
