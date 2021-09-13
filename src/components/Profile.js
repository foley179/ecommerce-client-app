import { useAuth } from "../contexts/authcontext"

export default function Profile() {
    const {currentUser} = useAuth()

    return (
        <main className="block col-2 profile">
            <h2>{currentUser.username}'s Profile Page</h2>
        </main>
    )
}