import React, {useEffect, useRef} from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import S1_logo from "../../assets/rediseno/ico_sistemas/ico_s1_color.svg";
import S2_logo from "../../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import S3_logo from "../../assets/rediseno/ico_sistemas/ico_s3_color.svg";
import S4_logo from "../../assets/rediseno/ico_sistemas/ico_s4_color.svg";
import S5_logo from "../../assets/rediseno/ico_sistemas/ico_s5_color.svg";
import S6_logo from "../../assets/rediseno/ico_sistemas/ico_s6_color.svg";

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        position: 'absolute'
    },
    item: {
        "&:hover": {
            borderWidth: 3,
            backgroundColor: "#64808f"
        },
        padding: theme.spacing(1),
        borderStyle: 'solid',
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
            {
                /*
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
                 */
            }

        </Grid>
    );
}
export default withStyles(styles)(SistemasMenu);
