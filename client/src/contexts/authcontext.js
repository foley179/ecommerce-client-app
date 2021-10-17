import React, { useContext, useState } from "react"
import axios from 'axios'

const AuthContext = React.createContext()

// created hook
export function useAuth() {
    return useContext(AuthContext)
}

// helper function
const prefix = process.env.NODE_ENV === 'production' ? "https://pern-ecommerce-app.herokuapp.com" : "http://localhost:4000"
function getUrl(relativeUrl) {
   return prefix + "/" + relativeUrl;
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    async function login(email, password) {
        const user = await axios.post(getUrl("users/login"), {
            email: email,
            password: password 
        })
        if(user.data[0]) {
            setCurrentUser(user)
            return currentUser
        } else {
            throw new Error("Invalid Email or Password please try again.")
        }
    }

    async function signup(username, email, password) {
        
        let newUser
        try {
            newUser = await axios.post(getUrl("users/create"), {
                username: username,
                email: email,
                password: password 
            })
        } catch (error) {
            throw new Error(error.message)
        }
        setCurrentUser(newUser)
        return currentUser
    }

    async function updateProfile(newUsername, newPassword, currUser) {
        
        let updatedUser
        try {
            updatedUser = await axios.put(getUrl("users/update"), {
                currUser: {
                    ...currUser
                },
                username: newUsername,
                password: newPassword 
            })
        } catch {
            throw new Error("Error updating profile please try again")
        }
        setCurrentUser(updatedUser)
        return currentUser
    }

    function logout() {
        setCurrentUser(null)
        return currentUser
    }
    
    async function forgotPassword(email) {
        try {
            await axios.post(getUrl("forgot-password"), {
                email: email
            })
            return currentUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function updatePassword(password, id, token) {
        try {
            const user = await axios.post(getUrl("reset-password"), {
                password: password,
                id: id,
                token: token
            })
            setCurrentUser(user)
            return currentUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // exports these out to be used in other components
    const value = {
        currentUser,
        login,
        logout,
        updateProfile,
        signup,
        updatePassword,
        forgotPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}