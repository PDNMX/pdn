import React from 'react';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BannerDesktop from "./BannerDesktop";
import BannerMobile from "./BannerMobile";
import IconS1 from "../../assets/rediseno/ico_sistemas/ico_s1_color.svg";
import IconS2 from "../../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import IconS3 from "../../assets/rediseno/ico_sistemas/ico_s3_color.svg";
import IconS4 from "../../assets/rediseno/ico_sistemas/ico_s4_color.svg";
import IconS5 from "../../assets/rediseno/ico_sistemas/ico_s5_color.svg";
import IconS6 from "../../assets/rediseno/ico_sistemas/ico_s6_color.svg";



function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
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

const Banner = (props) => {
    const isXsUp = useIsWidthUp("lg");
    return(
        <React.Fragment>
            {isXsUp && <BannerDesktop systems={systems}/>}
            {!isXsUp && <BannerMobile systems={systems}/>}
        </React.Fragment>
    );
}

export default Banner;