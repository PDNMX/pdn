import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {Grid, Paper, Typography} from "@mui/material";
//import HorizontalNonLinearStepper from "./HorizontalNonLinearStepper";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.white.color,
    },
    section: {
        maxWidth: '1024px'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    containerUp: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            padding: "2rem",
        },
    },
});


class FormularioDenuncia extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.section}>
                        <Typography variant="headline">
                            Denuncias
                        </Typography>
                        <Typography variant="body1">
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page
                            when looking at its layout. The point of using Lorem Ipsum is that it has a
                            more-or-less normal
                            distribution of letters
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        <Paper  className={classes.containerUp} >
                            {/*<HorizontalNonLinearStepper/>*/}
                        </Paper>
                    </Grid>
                </Grid>


            </div>
        );
    }
}

FormularioDenuncia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormularioDenuncia);