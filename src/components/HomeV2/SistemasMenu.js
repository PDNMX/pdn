import React, {useEffect, useRef} from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        position: 'absolute',
        zIndex: 2,
        width: '100%'
    },
    item: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        borderStyle: 'solid',
        borderWidth: 2,
        maxWidth: theme.spacing(25),
        transition: 'height 2s',
        height: '70%'
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
        <Box id={"sistemasMenu"} ref={innerRef} className={classes.root}
             sx={{
                 display: 'flex',
                 justifyContent: 'space-evenly'
             }}>
            {
                systems.map(system => {
                    return (
                        <Link className={classes.link} to={system.path} key={system.path}>
                        <Box className={`${classes.item}`} sx={{
                            m: 1,
                            p: 2,
                            color: system.color
                        }} key={system.path}>
                            <div className={`${classes.opc} `}>

                                    <img src={system.icon} alt="PDN" className={classes.icon}/>
                                    <Typography color={system.color}>{system.shortName}</Typography>

                            </div>
                        </Box>
                        </Link>
                    );
                })
            }
        </Box>
    );
}
export default withStyles(styles)(SistemasMenu);
