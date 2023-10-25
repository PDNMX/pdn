import React from 'react';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BannerDesktop from "./BannerDesktop";
import BannerMobile from "./BannerMobile";
import pdnRoutes from "../../routes/index";
import LoginDialog from "../Login/LoginDialog";


function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}


const Banner = (props) => {
    const isXsUp = useIsWidthUp("lg");
    const systems = pdnRoutes.filter(route => route.type==='system')

    const [open, setOpen] = React.useState(false);

    return(
        <React.Fragment>
            {isXsUp && <BannerDesktop systems={systems} setOpenLoginDialog={setOpen}/>}
            {!isXsUp && <BannerMobile systems={systems} setOpenLoginDialog={setOpen}/>}
            <LoginDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}

export default Banner;