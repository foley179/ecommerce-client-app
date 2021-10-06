import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function PrivateRoute({Component, ...rest}) {
    const {currentUser} = useAuth()
    /* this takes a route (like profile) and outputs either the same route or redirects to the login screen based on if user is logged in.*/
    return (
        <Route
        {...rest} 
        Component={props => { // this was render but was causing warnings
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
        >
        </Route>
    )
}
