import React from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'
/* import LeftFooter from "./leftFooter";
import CenterFooter from "./centerFooter";
import RightFooter from "./rightFooter"; */
/* import MobileFooter from "./mobileFooter"; */
import CreativeIcon from '../IconCreativeCommons'
import { Link } from 'react-router-dom'

import logoSESNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg'
import logoPDN from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-pdn.svg'
import logoSNA from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg'
import Divider from '@mui/material/Divider'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import GitHubIcon from '@mui/icons-material/GitHub'
// import { makeStyles } from '@mui/styles';
// import css from './cssFooter';
// const useStyles = makeStyles(css);
function useIsWidthUp (breakpoint) {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up(breakpoint))
}
const Footer = () => {
  // const classes = useStyles();
  const isXsUp = useIsWidthUp('lg')
  return (
    <>
      <div className='footerBorderTop'>
        {/* <Grid container className="footer" direction="row">
      <Grid item xs={3}>
        <LeftFooter />
      </Grid>
      <CenterFooter />
      <RightFooter />
    </Grid> */}
        <Grid
          container
          direction='row'
          justifyContent={isXsUp ? 'space-between' : 'space-evenly'}
          alignItems='center'
          sx={{ maxWidth: 1200, margin: 'auto' }}
          className='mt-5 footerLogos'
          spacing={0}
        >
          <Grid item sm={3} xs={12} md={3} align='center'>
            <img src={logoSNA} alt='logo-sna' />
          </Grid>
          <Grid item sm={3} xs={12} md={3} align='center'>
            <img src={logoSESNA} alt='logo-sesna' />
          </Grid>
          <Grid item sm={3} xs={12} md={3} align='center'>
            <img src={logoPDN} alt='logo-sesna' />
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ maxWidth: 1200, margin: 'auto' }}
          className='mt-2'
        >
          <Grid item lg={12} md={12} sm={10}>
            <Divider />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          direction='row'
          justifyContent={isXsUp ? 'space-between' : 'space-evenly'}
          alignItems='center'
          sx={{ maxWidth: 1200, margin: 'auto', textAlign: 'center' }}
          className='mt-2 footerList'
        >
          <Grid item md={3} xs={12} sm={3}>
            <ul>
              <li><Link to='/about'>Acerca de la PDN</Link></li>
              <li><a rel='noreferrer' href='/mapa-sla/'>Avances de
                Interconexión
                  </a>
              </li>
              <li><a rel='noreferrer' href={import.meta.env.VITE_LINK_MDA}>Mercado Digital Anticorrupción</a>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} xs={12} sm={3}>
            <ul>
              <li>
                <Link to='/faq'>Preguntas frecuentes</Link>
              </li>
              <li><a rel='noreferrer' href='https://www.youtube.com/channel/UCJ0nWmB2-ADfn95r5cjmLJA/'>Videos</a></li>
              <li> <a rel='noreferrer' href='https://drive.google.com/drive/folders/1t_vGUfagr75TAZ8-E4NZfL-fU0BcsPlZ'>Boletines
                y prensa
                   </a>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} xs={12} sm={3}>
            <ul>
              <li><Link to='/mesa-de-ayuda'>Mesa de ayuda</Link></li>
              <li><Link to='/especificaciones'>Especificaciones técnicas</Link></li>
              <li> <a rel='noreferrer' href='/blog/'>Blog</a></li>
            </ul>
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ maxWidth: 1200, margin: 'auto' }}
          className='mt-2'
        >
          <Grid item lg={12} md={12} sm={10}>
            <Divider />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction='row'
          justifyContent={isXsUp ? 'space-between' : 'space-evenly'}
          alignItems='center'
          sx={{ maxWidth: 1200, margin: 'auto' }}
          className='mb-3 footerIcon'
        >
          <Grid item md={2} align='center'>
            <a rel='noreferrer' href='https://creativecommons.org/licenses/by-nc/4.0/deed.es' target='_blank'><CreativeIcon /></a>
          </Grid>
          <Grid item md={2} align='center'>
            <a rel='noreferrer' href='https://twitter.com/SESNAOficial' target='_blank'><TwitterIcon /></a>
          </Grid>
          <Grid item md={2} align='center'>
            <a rel='noreferrer' href='https://www.facebook.com/SESNAOficial/' target='_blank'><FacebookIcon /></a>
          </Grid>
          <Grid item md={2} align='center'>
            <a rel='noreferrer' href='https://github.com/orgs/PDNMX/' target='_blank'><GitHubIcon /></a>
          </Grid>
          <Grid item md={2} align='center'>
            <a rel='noreferrer' href='https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/featured' target='_blank'><YouTubeIcon /></a>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Footer
