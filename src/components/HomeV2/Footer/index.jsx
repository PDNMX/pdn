import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftFooter from "./leftFooter";
import CenterFooter from "./centerFooter";
import RightFooter from "./rightFooter";
import MobileFooter from "./mobileFooter";

import logoSESNA from "../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg";
import logoPDN from "../../../assets/rediseno2023/imgs/iconos/logotipos/logo-pdn.svg";
import logoSNA from "../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg";
import Divider from '@mui/material/Divider';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
// import { makeStyles } from '@mui/styles';
// import css from './cssFooter';
// const useStyles = makeStyles(css);
function useIsWidthUp(breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}
const Footer = (props) => {
  //const classes = useStyles();
  const isXsUp = useIsWidthUp("lg");
  return isXsUp ? (
    <>
      <div className="footerBorderTop">
      {/* <Grid container className="footer" direction="row">
      <Grid item xs={3}>
        <LeftFooter />
      </Grid>
      <CenterFooter />
      <RightFooter />
    </Grid> */}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        sx={{maxWidth: 1200, margin: 'auto'}}
        className="mt-5 footerLogos"
      >
        <Grid item xs={12} md={3} align="center">
          <img src={logoSNA} alt="logo-sna" />
        </Grid>
        <Grid item xs={12} md={3} align="center">
          <img src={logoSESNA} alt="logo-sesna" />
        </Grid>
        <Grid item xs={12} md={3} align="center">
          <img src={logoPDN} alt="logo-sesna" />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{maxWidth: 1200, margin: 'auto'}}
        className="mt-3"
      >
        <Grid item lg={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{maxWidth: 1200, margin: 'auto'}}
        className="mt-3 footerList"
      >
        <Grid item md={3}>
          <ul>
            <li><a href="https://www.plataformadigitalnacional.org/about">Acerca de la PDN</a></li>
            <li><a href="https://www.plataformadigitalnacional.org/mapa-sla/">Avances de
                Interconexión</a></li>
            <li><a href="https://mda.plataformadigitalnacional.org/">Mercado Digital Anticorrupción</a>
            </li>
          </ul>
        </Grid>
        <Grid item md={3}>
          <ul >
            <li><a href="https://www.plataformadigitalnacional.org/faq">Preguntas
                frecuentes</a></li>
            <li><a href="https://www.youtube.com/channel/UCJ0nWmB2-ADfn95r5cjmLJA/">Videos</a></li>
            <li> <a href="https://drive.google.com/drive/folders/1t_vGUfagr75TAZ8-E4NZfL-fU0BcsPlZ">Boletines
                y prensa</a></li>
          </ul>
        </Grid>
        <Grid item md={3}>
          <ul >
            <li><a href="https://www.plataformadigitalnacional.org/mesa-de-ayuda">Mesa de ayuda</a></li>
            <li><a href="https://www.plataformadigitalnacional.org/especificaciones">Especificaciones Técnicas</a></li>
            <li> <a href="https://www.plataformadigitalnacional.org/blog/">Blog</a></li>
          </ul>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{maxWidth: 1200, margin: 'auto'}}
        className="mt-3"
      >
        <Grid item lg={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{maxWidth: 1200, margin: 'auto'}}
        className="mb-3 footerIcon"
      >
        <Grid item md={2} align="center">
          <a href="https://twitter.com/SESNAOficial" target="_blank"><TwitterIcon/></a>
        </Grid>
        <Grid item md={2} align="center">
          <a href="https://www.facebook.com/SESNAOficial/" target="_blank"><FacebookIcon/></a>
        </Grid>
        <Grid item md={2} align="center">
          <a href="https://github.com/orgs/PDNMX/" target="_blank"><GitHubIcon/></a>
        </Grid>
        <Grid item md={2} align="center">
          <a href="https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/featured" target="_blank"><YouTubeIcon/></a>
        </Grid>
      </Grid>
      </div>
    </>
  ) : (
    <MobileFooter />
  );
};
export default Footer;
