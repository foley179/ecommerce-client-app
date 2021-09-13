import React, { useContext, useState } from "react"
import data from '../data' // mock data

const AuthContext = React.createContext()

// created hook
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    const {users} = data // mock data
    function login(email, password) {
        console.log("login attempt") // only for testing
        // for testing purposes, this will be removed and changed for a proper validation
        const user = users.filter((item) => (email === item.email))
        if (user.length === 0) {
            throw Error("no user with that email")
        } else if (user[0].password !== password) {
            throw Error("password incorrect")
        } else {
            setCurrentUser(user)
            return currentUser
        }
    }
    function signup(email, password) {
        console.log("signup attempt") // for testing
        const exist = users.filter((item) => (email === item.email))
        if (exist.length !== 0) {
            throw Error("user exists")
        } else {
            const user = {
                id: users.length + 1,
                username: "username (to be added)",
                email: email,
                password: password // to be hashed & salted
            }
            users.push(user)
            setCurrentUser(user)
            return currentUser
        }
    }

    const value = {
        currentUser,
        login,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}