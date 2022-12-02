import React from 'react';
import {withStyles} from '@mui/styles';
import {Breadcrumbs, Typography, Link} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link as RouterLink, useParams} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import estados from '../Cobertura/estados.json';
//import ReactGA from "react-ga";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
// const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

const styles = theme => ({
    whiteText: {
        color: theme.palette.greyColor
    },
    icon: {
        maxWidth: 150,
        [theme.breakpoints.up('md')]: {
            marginRight: 80
        },
        [theme.breakpoints.down('md')]: {
            marginRight: 10,
            marginLeft:10
        },
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
        maxWidth: 1200,
        margin: 'auto',
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(9)
    }
});


function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

function HeaderV2(props) {
    const {classes, section} = props;
    const isXsUp = useIsWidthUp("md");
    const {id_estado} = useParams();
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

                        {section.path.includes('/:id_estado') &&
                            <Link component={RouterLink}
                                  underline="hover"
                                  sx={{display: 'flex', alignItems: 'center'}}
                                  color='#ffffff' to="/cobertura">
                                <GrainIcon sx={{mr: 0.5}} fontSize="inherit"/>
                                Cobertura
                            </Link>
                        }

                        <Typography color={section.color}
                                    sx={{display: 'flex', alignItems: 'center'}}>
                            <GrainIcon sx={{mr: 0.5}} fontSize="inherit"/>
                            {section.path.includes('/:id_estado')
                                ? estados.find(e => e.route.includes(id_estado)).name
                                : section.shortName
                            }
                        </Typography>

                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container={true} className={classes.containerName} justifyContent={"center"} alignItems={"center"} direction={"row"}>
                <Grid item xs={12} md={3}  align = {isXsUp ? 'right':'center'}>
                    {section.icon && <img src={section.icon} alt="PDN" className={classes.icon}/>}
                </Grid>
                <Grid item xs={12} md={9} align = {isXsUp ? 'left':'center'}  >
                    <Typography variant="h3" paragraph color={`${section.color}`} style={{fontWeight: 100}}>
                        {section.name}
                    </Typography>
                    {section.subName && <Typography variant={"h5"} color={`${section.color}`}>
                        {section.subName}
                    </Typography>}
                </Grid>
            </Grid>
            {
                /*
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
                         justifyContent: 'space-evenly',
                         alignItems:"center",
                         direction:"row"
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
                 */
            }

        </div>
    )
        ;

}

//export default withWidth()(withStyles(styles)(HeaderV2));
export default withStyles(styles)(HeaderV2);
