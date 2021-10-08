import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authcontext"

export default function Profile() {
    const {currentUser} = useAuth()

    return (
        <main className="block col-2 profile">
            <h2>{currentUser.data.username}'s Profile Page</h2>
            <h3>Email: {currentUser.data.email}</h3>
            <Link to="/updateProfile"><button className="loginbutton button">Edit Profile</button></Link>
        </main>
    )
}