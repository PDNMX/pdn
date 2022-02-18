import React from 'react';
import {withStyles} from '@mui/styles';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

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
        background: theme.palette.background.opaque,
        backgroundOpacity: ".2",
    },
    containerName:{
        marginBottom: theme.spacing(4)
    }
});

function HeaderV2(props) {
   const {classes, system} = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                <Grid item xs={12} className={classes.breadcrumItem}>
                    <ul>
                        <li>
                            <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                        </li>
                        <li>
                            {system.shortName}
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 8,
                    marginBottom: 10
                }}
            >
                <Box className={classes.containerName}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <img src={system.icon} alt="PDN" className={classes.icon}/>
                    <Typography variant="h4" paragraph color={`${system.color}`} style={{fontWeight: 300}}>
                        {system.name}
                    </Typography>
                </Box>
            </Box>
        </div>

    )
        ;

}

export default withWidth()(withStyles(styles)(HeaderV2));
