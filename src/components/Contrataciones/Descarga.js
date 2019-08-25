import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/CloudDownload';

const styles = theme =>  ({
    root: {
        flexGrow:1,
    },
    descarga: {
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: '48px',
        paddingBottom: theme.spacing(6)
    }
});
class Descarga extends React.Component{


    render() {

        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} align="center">
                        <Typography className={classes.descarga} variant="h5"> Descarga todos los datos</Typography>

                        <IconButton href="https://datos.gob.mx/busca/organization/contrataciones-abiertas" target="_blank">
                            <DownloadIcon style={{fontSize: 60}}/>
                        </IconButton>


                    </Grid>
                </Grid>

            </div>
        )
    }

}

export default withStyles(styles)(Descarga);