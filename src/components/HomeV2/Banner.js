import React from 'react';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BannerDesktop from "./BannerDesktop";
import BannerMobile from "./BannerMobile";
import pdnRoutes from "../../routes/index";


function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
const systems = pdnRoutes.filter(route => route.type==='system')

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