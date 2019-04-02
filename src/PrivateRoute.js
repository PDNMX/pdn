import React from "react";
import {Route, Redirect} from "react-router-dom";
import Can from "./components/Permissions/Can";


export default function PrivateRoute({
                                         component: Component, perfom,
                                         ...rest
                                     }) {
    return (
        <Route
            {...rest}
            render={props =>
                <Can
                 perfom={perfom}
                 yes={()=><Component {...props} {...rest}/>}
                 no={()=><Redirect to="/"/>}
                />
            }
        />
    );
}