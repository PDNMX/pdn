import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography} from "@mui/material";
import {UserContext} from "../Login/UserContext";

const styles = theme => ({
    root:{
        backgroundColor: "#ebe9f9",
        padding: "0px 12px"
    },
});


function Version(props){
    const { classes } = props;
    /* let date = new Date()
    let day = date.getDate()
    let month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
    let year = date.getFullYear() */

    const {user} = React.useContext(UserContext);


    return(
        <React.Fragment>
            <div className={classes.root}>
                    <Typography display={'inline'}><b>{`Versión 1.1`}</b>&nbsp;&nbsp;</Typography>
            </div>
            {user.loggedIn &&
                <div className={classes.bienvenida}>
                    <Typography display={'inline'}>
                        <b> Bienvenido {`${user.nombres} ${user.primerApellido}`} - {user.username}</b>
                    </Typography>
                </div>
            }
        </React.Fragment>
    );
}


export default withStyles(styles)(Version);
