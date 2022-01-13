import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Version from "./Version";
import BlogSys from "./BlogSys";
import IconS1 from "../../assets/rediseno/ico_sistemas/ico_s1_color.svg";
import IconS2 from "../../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import IconS3 from "../../assets/rediseno/ico_sistemas/ico_s3_color.svg";
import IconS4 from "../../assets/rediseno/ico_sistemas/ico_s4_color.svg";
import IconS5 from "../../assets/rediseno/ico_sistemas/ico_s5_color.svg";
import IconS6 from "../../assets/rediseno/ico_sistemas/ico_s6_color.svg";
import Banner from "./Banner";


const styles = theme => ({
    root: {
        flexGrow :1,
    },
    item: {
        maxWidth: 1200
    },
    sistemas: {
        background: '#34b3eb'
    },
    mercado:{
        backgroundColor: "#f6f6f6"
    },
});

const systems = [
    {
        name: "Sistema de Declaraciones",
        color: "#f29888",
        icon: IconS1,
        url: "/declaraciones",
        disabled: false
    },
    {
        name: "Sistema de Servidores Públicos en contrataciones",
        color: "#b25fac",
        icon: IconS2,
        url: "/servidores",
        disabled: false
    },
    {
        name: "Sistema de Sancionados",
        color: "#9085da",
        icon: IconS3,
        url: "/sancionados",
        disabled: false
    },
    {
        name: "Sistema de Fiscalización",
        color: "#88bc69",
        icon: IconS4,
        url: "#",
        disabled: true
    },
    {
        name: "Sistema de Denuncias",
        color: "#34c9b2",
        icon: IconS5,
        url: "#",
        disabled: true
    },
    {
        name: "Sistema de Contrataciones",
        color: "#42a5cc",
        icon: IconS6,
        url: "/contrataciones",
        disabled: false
    }
];


const Home = props => {
    const { classes } = props;


    return (
        <React.Fragment>
            <Banner systems={systems}/>
            <Version/>
            <BlogSys/>
        </React.Fragment>
    );
}

export default withStyles(styles)(Home);