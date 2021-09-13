import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function PrivateRoute({ component: Component, ...rest}) {
    const {currentUser} = useAuth()
    /* this takes a route (like profile) and outputs either the same route or redirects to the login screen based on if user is logged in */
    return (
        <Route
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
        >
        </Route>
    )
}
