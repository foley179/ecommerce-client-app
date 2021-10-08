import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authcontext"

export default function Profile() {
    const {currentUser} = useAuth()

    try {
        const user = currentUser.data[0]

        return (
            <main className="block col-2 profile">
                <h2>{user.username}'s Profile Page</h2>
                <h3>Email: {user.email}</h3>
                <Link to="/updateProfile"><button className="loginbutton button">Edit Profile</button></Link>
            </main>
        )
    } catch (error) {
        return (
            <main className="block col-2 profile">
                <h2>Error retreiving profile page, please try again.</h2>
            </main>
        )
    }

}