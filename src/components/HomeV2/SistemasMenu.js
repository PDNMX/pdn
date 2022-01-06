import React, {useEffect, useRef} from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import S1_logo from "../../assets/rediseno/ico_s1_color.svg";
import S2_logo from "../../assets/rediseno/ico_s2_color.svg";
import S3_logo from "../../assets/rediseno/ico_s3_color.svg";
import S4_logo from "../../assets/rediseno/ico_s4_color.svg";
import S5_logo from "../../assets/rediseno/ico_s5_color.svg";
import S6_logo from "../../assets/rediseno/ico_s6_color.svg";

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: 20,
        paddingBottom: 20,
        position: 'absolute'
    },
    item: {
        "&:hover": {
            transform: 'scale(1.1)',
            borderWidth: 3
        },
        padding: 10,
        borderStyle: 'solid',
        minWidth: 200,
        transition: 'height 2s'
    },
    opc: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    icon: {
        maxWidth: 60,
        paddingBottom: 10
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    },
    textS1: {
        color: theme.palette.S1.color
    },
    textS2: {
        color: theme.palette.S2.color
    },
    textS3: {
        color: theme.palette.S3.color
    },
    textS4: {
        color: theme.palette.S4.color
    },
    textS5: {
        color: theme.palette.S5.color
    },
    textS6: {
        color: theme.palette.S6.color
    },

});

const SistemasMenu = props => {
    const {classes} = props;
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
            <Grid item xs={1} className={`${classes.item} ${classes.textS1}`}>
                <div className={`${classes.opc} `}>
                    <Link className={classes.link} to="/declaraciones">
                        <img src={S1_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS1}>Sistema de Declaraciones</Typography>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={1} className={`${classes.item} ${classes.textS2}`}>
                <div className={`${classes.opc}`}>
                    <Link className={classes.link} to="/servidores">
                        <img src={S2_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS2}>Sistema de Servidores Públicos en
                            contrataciones</Typography>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={1} className={`${classes.item} ${classes.textS3}`}>
                <div className={`${classes.opc}`}>
                    <Link className={classes.link} to="/sancionados">
                        <img src={S3_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS3}>Sistema de Sancionados</Typography>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={1} className={`${classes.item} ${classes.textS4}`}>
                <div className={`${classes.opc}`}>
                    <Link className={classes.link} to="#">
                        <img src={S4_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS4}>Sistema de Fiscalización</Typography>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={1} className={`${classes.item} ${classes.textS5}`}>
                <div className={`${classes.opc}`}>
                    <Link className={classes.link} to="#">
                        <img src={S5_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS5}>Sistema de Denuncias</Typography>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={1} className={`${classes.item} ${classes.textS6}`}>
                <div className={`${classes.opc}`}>
                    <Link className={classes.link} to="/contrataciones">
                        <img src={S6_logo} alt="PDN" className={classes.icon}/>
                        <Typography className={classes.textS6}>Sistema de Contrataciones</Typography>
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
}
export default withStyles(styles)(SistemasMenu);
