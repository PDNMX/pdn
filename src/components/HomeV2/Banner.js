import React from 'react';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BannerDesktop from "./BannerDesktop";
import BannerMobile from "./BannerMobile";



function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
const Banner = (props) => {
    const {systems} = props;
    const isXsUp = useIsWidthUp("lg");
    return(
        <React.Fragment>
            {isXsUp && <BannerDesktop systems={systems}/>}
            {!isXsUp && <BannerMobile systems={systems}/>}
        </React.Fragment>
    );
}

export default Banner;