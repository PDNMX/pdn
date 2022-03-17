import React from 'react';
import {withStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PropTypes from "prop-types";

const styles = theme =>  ({
    root: {
        flexGrow:1,
    },
    descarga: {
        color: theme.palette.primario.contrastText,
        fontWeight: 500,
        fontSize: '48px',
        paddingBottom: theme.spacing(6)
    },
    iconDownload:{
        color: theme.palette.primario.contrastText,
        fontSize: 60
    }
});
class Descarga extends React.Component{


    render() {

        const {classes,url} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justifyContent="center">
                    <Grid item xs={12} align="center">
                        <Typography className={classes.descarga} variant="h5"> Descarga todos los datos</Typography>

                        <IconButton href={url} target="_blank" size="large">
                            <DownloadIcon className={classes.iconDownload}/>
                        </IconButton>
                    </Grid>
                </Grid>

            </div>
        );
    }

}

Descarga.propTypes = {
    url: PropTypes.string.isRequired
};

export default withStyles(styles)(Descarga);