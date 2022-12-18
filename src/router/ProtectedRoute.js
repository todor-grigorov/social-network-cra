import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

export const isRouteProtected = (user) => {
    return user.email && user.displayName;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state => state.user));

    return (
        isRouteProtected(user) ?
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            } />
            :
            <Redirect to='/' />

    )
};

export default ProtectedRoute;