import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function PrivateRoute({
                                         component: Component,
                                         sesion,
                                         ...rest
                                     }) {
    return (
        <Route
            {...rest}
            render={props =>
                sesion.authenticated === true? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to="/"/>
                )
            }
        />
    );
}