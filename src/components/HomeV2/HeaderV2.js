import React from 'react';
import {withStyles} from '@mui/styles';
import Box from "@mui/material/Box";
import {Breadcrumbs, Typography, Link} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
// const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

const styles = theme => ({
    whiteText: {
        color: theme.palette.greyColor
    },
    icon: {
        maxWidth: 150,
        marginRight: 80
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    breadcrumItem: {
        maxWidth: 1200,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.opaque + '80', // 80 hex => 128 dec => 50%
    },
    containerName: {
        marginBottom: theme.spacing(4),
        maxWidth: 1200
    }
});

function HeaderV2(props) {
    const {classes, section} = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={0} justifyContent='center'>
                <Grid item xs={12} className={classes.breadcrumItem}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{color: '#ffffff', paddingTop: '10px'}}>
                        <Link component={RouterLink}
                              underline="hover"
                              sx={{display: 'flex', alignItems: 'center'}}
                              color='#ffffff' to="/">
                            <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
                            Plataforma Digital Nacional
                        </Link>

                        {section.path.includes('/especificaciones/') &&
                            <Link component={RouterLink}
                                  underline="hover"
                                  sx={{display: 'flex', alignItems: 'center'}}
                                  color='#ffffff' to="/especificaciones">
                                <GrainIcon sx={{mr: 0.5}} fontSize="inherit"/>
                                Especificaciones
                            </Link>
                        }

                        <Typography color={section.color}
                                    sx={{display: 'flex', alignItems: 'center'}}>
                            <GrainIcon sx={{mr: 0.5}} fontSize="inherit"/>
                            {section.shortName}
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 9,
                    paddingBottom: 9
                }}
            >
                <Box className={classes.containerName}
                     sx={{
                         display: 'flex',
                         justifyContent: 'space-evenly'
                     }}
                >
                    {section.icon && <img src={section.icon} alt="PDN" className={classes.icon}/>}
                    <div>
                        <Typography variant="h3" paragraph color={`${section.color}`} style={{fontWeight: 100}}>
                            {section.name}
                        </Typography>
                        {section.subName && <Typography variant={"h5"} color={`${section.color}`}>
                            {section.subName}
                        </Typography>}
                    </div>
                </Box>
            </Box>
        </div>
    )
        ;

}

//export default withWidth()(withStyles(styles)(HeaderV2));
export default withStyles(styles)(HeaderV2);
