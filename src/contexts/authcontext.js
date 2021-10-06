import React, { useContext, useState } from "react"
import axios from 'axios'

const AuthContext = React.createContext()

// created hook
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    async function login(email, password) {
        console.log("login attempt") // only for testing
        // for testing purposes, this will be removed and changed for a proper validation
        try {
            const user = await axios.post("http://localhost:4000/users/login", {
                email: email,
                password: password
            })
            setCurrentUser(user)
            return currentUser
        } catch (error) {
            throw new Error("Invalid User or Password please try again.")
        }
    }

    function signup(username, email, password) {
        console.log("signup attempt") // for testing
        /*
        const exist = users.filter((item) => (email === item.email))
        if (exist.length !== 0) {
            throw Error("user exists")
        } else {
            const user = {
                id: users.length + 1,
                username: username,
                email: email,
                password: password // to be hashed & salted
            }
            users.push(user)
            setCurrentUser(user)
            return currentUser
        }*/
    }

    function updateProfile(newUsername, newPassword, currUser) {
        console.log("update attempt")
        /*
        let updatedUser
        try {
            if (newPassword === "") {
                updatedUser = {...currUser, username: newUsername}
                users.map((user) => currUser.id !== user.id ? user : updatedUser)
            } else if(newUsername === "") {
                updatedUser = {...currUser, password: newPassword}
                users.map((user) => currUser.id !== user.id ? user : updatedUser)
            } else {
                updatedUser = {...currUser, username: newUsername, password: newPassword}
                users.map((user) => currUser.id !== user.id ? user : updatedUser)
            }
        } catch {
            throw new Error("Error updating profile please try again")
        }
        console.log("update user = " + updatedUser.username)
        setCurrentUser(updatedUser)
        return currentUser*/
    }

    function logout() {
        console.log("logged out") // for testing
        setCurrentUser(null)
        return currentUser
    }

    // exports these out to be used in other components
    const value = {
        currentUser,
        login,
        logout,
        updateProfile,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}