import React, {useEffect, useRef} from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        position: 'absolute',
        zIndex: 2
    },
    item: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        padding: theme.spacing(1),
        borderStyle: 'solid',
        borderWidth: 2,
        minWidth: theme.spacing(25),
        transition: 'height 2s'
    },
    opc: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        textAlign: 'center',
    },
    icon: {
        maxWidth: theme.spacing(7),
        paddingBottom: theme.spacing(1)
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    }

});

const SistemasMenu = props => {
    const {classes, systems} = props;
    const innerRef = useRef(null);

    useEffect(() => {
        const x = document.getElementById("sistemasMenu");
        x.addEventListener("mouseleave", toggle);
        return () => {
            x.removeEventListener("mouseleave", toggle);
        };
    }, []);

    const toggle = (e) => {
        props.toogle();
    }

    return (
        <Grid id={"sistemasMenu"} ref={innerRef} container className={classes.root} justifyContent={'space-evenly'}>
            {
                systems.map(system => {
                    return (
                        <Grid item xs={1} className={`${classes.item}`} style={{"color": system.color}} key={system.name}>
                            <div className={`${classes.opc} `}>
                                <Link className={classes.link} to={system.url}>
                                    <img src={system.icon} alt="PDN" className={classes.icon}/>
                                    <Typography color={system.color} >{system.name}</Typography>
                                </Link>
                            </div>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}
export default withStyles(styles)(SistemasMenu);
