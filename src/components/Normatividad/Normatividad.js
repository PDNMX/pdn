import React from 'react';
import {Grid, Box, Paper} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

import bgimg from "@assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from "../HomeV2/HeaderV2";
import ExpansionPanels from './ExpansionPanels';
import pdnRoutes from "../../routes";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primario.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    rootItem: {
        maxWidth: 1200,
        paddingTop: 90,
        paddingBottom: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)

    },
    sistemas: {
        maxWidth: 200,
        "&:hover": {
            opacity: .5
        }
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.greyColor,
        //paddingBottom: 60
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    }
});

const Normatividad = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/normatividad');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>
                      {/*   <div>
                        <Typography variant="h6">Normativa General</Typography>
                        <hr/><br/>
                        <Typography paragraph>
                            El marco normativo de la PDN está compuesto por:
                        </Typography>

                        <ul>
                            <li><Typography>
                                <MuiLink href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSNA_200521.pdf" target="_blank">
                                Ley General del Sistema Nacional Anticorrupción (LGSNA)</MuiLink> artículos 9, fracciones XII, XIII y XVI; 17; 21, fracción VII, inciso b); 35, fracciones X y XI).
                            </Typography>
                            </li>
                            <li>
                                <Typography>
                                    <MuiLink href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf" target="_blank">
                                        Ley General de Responsabilidades Administrativas (LGRA)</MuiLink> artículos 26, 27, 30, 31, 34, 43, 44, 46, 59 y 93.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018" target="_blank">
                                        Bases para el Funcionamiento de la Plataforma Digital Nacional</MuiLink>, las cuales establecen las directrices para el funcionamiento de la PDN y de los sistemas que la conforman, buscando garantizar en todo momento la interoperabilidad, interconexión, estabilidad, uso y seguridad de la información.
                                </Typography>
                            </li>
                        </ul>
                    </div> */}

                            <ExpansionPanels/>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );
}

export default withStyles(styles)(Normatividad);
