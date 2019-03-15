import React from "react";
import {Route, Redirect} from "react-router-dom";
import Can from "./components/Permissions/Can";

export default function PrivateRoute({
                                         component: Component,
                                         sesion, perfom,
                                         ...rest
                                     }) {
    return (
        <Route
            {...rest}
            render={props =>
                <Can
                 role={sesion.currentUser.rol}
                 perfom={perfom}
                 yes={()=><Component {...props} {...rest}/>}
                 no={()=><Redirect to="/"/>}
                />
                /*
                sesion.authenticated === true? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to="/"/>
                )
                */
            }
        />
    );
}