
import React, { useState, useEffect } from "react";
import withStyles from '@mui/styles/withStyles';
import {Paper, Typography, Grid} from "@mui/material";
import CountUp from 'react-countup';

const ligaDatosNumeralia = process.env.REACT_APP_NUMERALIA;

const styles = theme => ({
    container: {
        padding: "5% 3%",
        backgroundColor: 'rgba(42, 116, 145)',
        minHeight: '320px'
    },
    Foot: {
        backgroundColor: '#3E5866',
    },
    headingText: {
        color: "#efd643",
        fontWeight: 500,
        fontSize: '45px',
    },
    text:{
        fontSize: '18px',
        fontWeight: 400,
        color: "#efd643",
    },
    textFoot:{
        fontSize: '15px',
        color: theme.palette.text.main,
        margin: "5px"
    },
    
});


const Numeralia = props => {
    const {classes} = props;

    const [isLoading, setIsLoading] = useState(true);
    const [numeralia, setNumeralia] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      if (isLoading) {
        async function fetchData() {
          try {
            const response = await fetch(ligaDatosNumeralia);
            if (response.ok) {
              const data = await response.json();
              setNumeralia(data);
              setError(null);
              setIsLoading(false);
            } else {
              setError("Hubo un error al obtener la información");
            }
          } catch (error) {
            setError("No pudimos hacer la solicitud para obtener la información");
          }
        }
        fetchData();
      }
    }, [isLoading]);
    if (isLoading) {
      return (
        <React.Fragment>
        <Paper>
        <Grid container direction="row"  alignItems="flex-start" justifyContent='center' className={classes.container}>
            <Grid item md={12} sm={12} xs={12} align="center">
                <Typography className={classes.headingText} paragraph>
                    Cargando Información...
                </Typography>
            </Grid>
        </Grid>
        </Paper>
    </React.Fragment>
      );
    }
    if (error) {
      return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container direction="row"  alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item md={12} sm={12} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        {error}
                    </Typography>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
      );
    }
 
    return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container direction="row"  alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item lg={2} md={4} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        <CountUp separator="," end={numeralia.values[0][1]} duration={3} delay={0}>
                            {({ countUpRef }) => (
                            <span ref={countUpRef} />
                            )}
                        </CountUp>
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Entes conectados
                    </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        <CountUp separator="," end={(numeralia.values[1][1])} duration={3} delay={0}>
                            {({ countUpRef }) => (
                                <span ref={countUpRef} />
                            )}
                        </CountUp>
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Declaraciones
                    </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        <CountUp separator="," end={numeralia.values[2][1]} duration={3} delay={0}>
                            {({ countUpRef }) => (
                                <span ref={countUpRef} />
                            )}
                        </CountUp>
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Procedimientos de contratación
                    </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        <CountUp separator="," end={numeralia.values[3][1]} duration={3} delay={0}>
                            {({ countUpRef }) => (
                                <span ref={countUpRef} />
                            )}
                        </CountUp>
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Sanciones
                    </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        <CountUp separator="," end={numeralia.values[4][1]} duration={3} delay={0}>
                            {({ countUpRef }) => (
                                <span ref={countUpRef} />
                            )}
                        </CountUp>
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Herramientas en el MDA
                    </Typography>
                </Grid>
            </Grid>
            </Paper>
            <Grid container direction="row"  alignItems="flex-end" justifyContent='flex-end'>
                <Grid item md={10} sm={10} xs={12} align="right" className={classes.Foot}>
                    <Typography className={classes.textFoot} paragraph>
                        Estadística actualizada al {numeralia.values[5][1]}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default withStyles(styles)(Numeralia);
