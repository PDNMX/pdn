import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link as RouterLink} from 'react-router-dom';
import {Typography, Grid, Breadcrumbs, Link} from "@mui/material"
import Banner from "../HomeV2/Banner";
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

const style = theme => ({
        root: {
            flexGrow:1,
            backgroundColor: theme.palette.background.opaque+'80', // 80 hex => 128 dec => 50%
        },
        container1: {
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        item1:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3:{
            maxWidth: 1200,
        },
        logo: {
            maxWidth: '150px'
        },
        whiteText: {
            color: '#ffffff',
            fontWeight: '100'
        },
        button:{
            background: '#ffe01b',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        },
        currentSection:{
            color: theme.palette.S4.color
        }
    }
);

const Header = props => {
    const {classes} = props;

    return(
        <div className={classes.root}>
            <Banner/>

            <Grid container spacing={0} justifyContent='center'>
                <Grid item xs={12} className={classes.item3}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{color:'#ffffff', paddingTop: '10px'}}>
                        <Link component={RouterLink}
                              underline="hover"
                              sx={{ display: 'flex', alignItems: 'center' }}
                              color='inherit' to="/">
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Plataforma Digital Nacional
                        </Link>

                        <Typography className={classes.currentSection}
                                    sx={{ display: 'flex', alignItems: 'center' }}>
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Preguntas frecuentes
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>


            <Grid container spacing={0} className={classes.container1} justifyContent='center'>
                <Grid item xs={12} align='center' className={classes.item3}>
                    <Typography variant="h3" paragraph className={classes.whiteText} >
                        Preguntas frecuentes
                    </Typography>
                </Grid>
            </Grid>

        </div>
    );
}

export default withStyles(style)(Header);
