import React from 'react';
import {withStyles} from "@mui/styles";
import {Box, Button, Typography} from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import logo from '../../assets/ico-evolucion.svg';

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '200px',
        backgroundColor: theme.palette.background.paperChart,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(2)
    },
    logo: {
        width: '130px'
    },
    btnPDN: {
        margin: theme.spacing(1),
        background: "rgb(255,255,255,0.5)",
        borderRadius: "50px",
        fontWeight: "bold",
        fontStyle: "italic",
        '&:hover': {
            backgroundColor: "#56a3bf",
        },
    },
    manitad:{
        paddingRight: '6px',
        maxHeight: '40px'
    },
    manitai:{
        maxHeight: '40px'
    },
    headingText: {
        color: theme.palette.text.main,
        fontWeight: "bold",
        maxWidth: '450px'
    }
});

const Evolucion = props => {
    const {classes} = props;
    const url = "https://evolucion.plataformadigitalnacional.org";

    return <div className={classes.root}>

        <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center'}}>

            <Box p={3}>
                <img src={logo} alt='Semana PDN' className={classes.logo}/>
            </Box>

            <Box p={3}>
                <Typography variant="h5" className={classes.headingText} paragraph>
                    Herramienta de Verificación de
                    Evolucion patrimonial y de intereses
                </Typography>

                <Button className={classes.btnPDN} href={url} target='_blank' variant='contained'
                        startIcon={<DirectionsWalkIcon/>}>
                    Acceso
                </Button>
            </Box>

        </Box>
    </div>
}


export default withStyles(styles)(Evolucion);