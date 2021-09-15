import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../contexts/authcontext'

export default function PrivateRoute({ component: Component, ...rest}) {
    const {currentUser} = useAuth()
    /* this takes a route (like profile) and outputs either the same route or redirects to the login screen based on if user is logged in.
    line 10 (inside <Route />) i originally had {...rest} but it was causing a warning and preventing redirects */
    return (
        <Route
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
        >
        </Route>
    )
}
