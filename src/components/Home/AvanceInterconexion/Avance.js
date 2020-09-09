import React from "react";
import {Box, Typography, Button, withStyles, Grid} from "@material-ui/core";
import Plat from "../../../assets/iconos_barra/ico-plataformas_sistemas.svg";

const styles = theme => ({
    root: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(10),
    },
    headingText: {
        color: theme.palette.titleBanner.color,
        fontWeight: "700",
        fontSize: '48px',
        textAlign: "center"
    },
    titleBox: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(2)
    },
    logoBox: {
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        width: '90%',
        [theme.breakpoints.down('md')]:{
            maxWidth: 350
        }
    },
    button:{
        background: '#ffe01b',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    item: {
        padding: theme.spacing(1)
    }
});

const Avance = props => {
    const {classes} = props;
    return <div className={classes.root}>
        <Box className={classes.titleBox}>
            <Typography className={classes.headingText}>
                Avance de interconexión
            </Typography>
        </Box>

        <Grid container spacing={2} className={classes.item}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Box className={classes.logoBox}>
                    <img src={Plat} alt="Interconexión subnacional" className={classes.icon}/>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.item}>

                <Typography variant="h6">
                    Legislación
                </Typography>

                <Typography color="textPrimary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus nisl nibh, ac dignissim augue condimentum a. Nunc et commodo diam. Maecenas non ipsum pellentesque, egestas lectus bibendum, vulputate libero. Praesent non nibh feugiat, efficitur diam nec, lobortis metus. Morbi vulputate, purus sed cursus congue, turpis turpis laoreet ex, tincidunt ornare justo eros a turpis.
                </Typography>

                <Button variant="contained"
                        className={classes.button}
                        href="https://plataformadigitalnacional.org/mapa-sla/"
                >
                    Conoce más
                </Button>

                <Typography variant="h6">
                    Sistemas 2 y 3
                </Typography>

                <Typography color="textPrimary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus nisl nibh, ac dignissim augue condimentum a. Nunc et commodo diam. Maecenas non ipsum pellentesque, egestas lectus bibendum, vulputate libero. Praesent non nibh feugiat, efficitur diam nec, lobortis metus. Morbi vulputate, purus sed cursus congue, turpis turpis laoreet ex, tincidunt ornare justo eros a turpis.
                </Typography>

                <Button variant="contained"
                        className={classes.button}
                        href="https://plataformadigitalnacional.org/mapa-avance/"
                >
                    Conoce más
                </Button>

            </Grid>
        </Grid>



    </div>
}


export default withStyles(styles)(Avance);