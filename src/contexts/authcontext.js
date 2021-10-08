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
        const user = await axios.post("http://localhost:4000/users/login", {
            email: email,
            password: password // TODO: hash and salt
        })
        if(user.data[0]) {
            setCurrentUser(user)
            return currentUser
        } else {
            throw new Error("Invalid Email or Password please try again.")
        }
    }

    async function signup(username, email, password) {
        console.log("signup attempt") // for testing
        
        let exist
        try {
            exist = await axios.post("http://localhost:4000/users/create", {
                username: username,
                email: email,
                password: password // TODO: hash and salt
            })
        } catch (error) {
            throw new Error(error.message)
        }
        setCurrentUser(exist)
        return currentUser
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