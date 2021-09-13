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
        if (user.length === 0 || user[0].password !== password) {
            throw Error("Email or password incorrect please try again")
        } else {
            setCurrentUser(user[0])
            return currentUser
        }
    }

    function signup(username, email, password) {
        console.log("signup attempt") // for testing
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
        }
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
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}