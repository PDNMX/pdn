import React from 'react';
import {Typography, Box, useMediaQuery} from "@mui/material";
import {withStyles, useTheme} from "@mui/styles";
import SysCard from "./SysCard";
import IconS1 from "../../../assets/rediseno/ico_sistemas/ico_s1_color.svg"
import IconS2 from "../../../assets/rediseno/ico_sistemas/ico_s2_color.svg"
import IconS3 from "../../../assets/rediseno/ico_sistemas/ico_s3_color.svg"
import IconS4 from "../../../assets/rediseno/ico_sistemas/ico_s4_color.svg"
import IconS5 from "../../../assets/rediseno/ico_sistemas/ico_s5_color.svg"
import IconS6 from "../../../assets/rediseno/ico_sistemas/ico_s6_color.svg"

const styles = theme => ({
    root: {
        maxWidth: 920
    }
});

const systems = [
    {
        name: "Sistema de Declaraciones",
        color: "#F8CAC4",
        icon: IconS1,
        url: "/declaraciones"
    },
    {
        name: "Sistema de Servidores Públicos en contrataciones",
        color: "#D8ACD8",
        icon: IconS2,
        url: "/servidores"
    },
    {
        name: "Sistema de Sancionados",
        color: "#C6C1EB",
        icon: IconS3,
        url: "/sancionados"
    },
    {
        name: "Sistema de Fiscalización",
        color: "#C4DDB6",
        icon: IconS4,
        url: "/fiscalizacion"
    },
    {
        name: "Sistema de Denuncias",
        color: "#34c9b2",
        icon: IconS5,
        url: "/denuncias"
    },
    {
        name: "Sistema de Contrataciones",
        color: "#B2DBEB",
        icon: IconS6,
        url: "/contrataciones"
    }
];

const CustomTypography = withStyles({
    root: {
        color: "#d0d7d9"
    }
})(Typography);

const SysPDN = props => {
    const {classes} = props;
    const theme = useTheme();

    const justify = useMediaQuery(theme.breakpoints.down("md")) ? "center" : "left"

    return (
        <div className={classes.root}>
            <CustomTypography variant="h3" fontWeight="bold" paragraph>
                Sistemas de la PDN
            </CustomTypography>

            <CustomTypography fontWeight="100" paragraph>
                El desarrollo de la <b>PDN</b> considera seis sistemas que integran datos estratégicos para la lucha
                contra la corrupción, contemplados en
                la <b>Ley General del Sistema Nacional Anticorrupción (LGSNA).</b>
            </CustomTypography>

            <Box display="flex" flexWrap="wrap" justifyContent = {justify}>
            {
                systems.map((s, i) => {
                    return <SysCard key={i} sys={s}/>
                })
            }
            </Box>
        </div>
    );
}

export default withStyles(styles)(SysPDN);
