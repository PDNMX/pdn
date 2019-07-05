import  React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import IconProblem from "@material-ui/icons/ReportProblem";

const styles = theme => ({
    mensaje:{
        textAlign: "center",
        color : theme.palette.red.color
    },
    icon :{
        color : theme.palette.red.color,
        fontSize : "5em"
    },
    iconContainer:{
        textAlign:"center",

    }
});

class MensajeErrorDatos extends  React.Component{
    render(){
        const {classes} = this.props;

        return(
            <Grid container>
                <Grid item xs={12}>
                    <Grid item xs={12} className={classes.iconContainer}>
                        <IconProblem className={classes.icon}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" paragraph className={classes.mensaje}>
                            <b>Servicio no disponible</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles,{withTheme:true})(MensajeErrorDatos);