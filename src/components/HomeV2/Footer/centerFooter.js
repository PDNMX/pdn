import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

import ReactGA from "react-ga4";

const useStyles = makeStyles(css);

const CenterFooter = props => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} >
        <Grid container direction={'row'} justifyContent={'center'} alignItems={'stretch'}>
          <Grid item xs={4}>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-end'>
              <Grid item style={{ textAlign: 'right' }}>
                {/* <Typography variant='subtitle1' style={{ color: '#FFF' }}>
                  <strong>Sistemas PDN</strong>
                </Typography> */}
                <Typography>
                  <Link href='https://www.plataformadigitalnacional.org/mapa-avance/' target='_blank' underline='none' onClick={()=>ReactGA.pageview('/mapa-avance')}>
                    Avances de Interconexión
                  </Link>
                </Typography>
                <Typography>
                  <Link href='https://mda.plataformadigitalnacional.org/' target='_blank' underline='none' onClick={()=>ReactGA.pageview('/mda')}>
                    Mercado Digital Anticorrupción
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start'></Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start' >
              <Grid item>
                <Typography variant='subtitle1'>
                  <RouterLink to={'/faq'}>
                    Preguntas frecuentes
                  </RouterLink>
                </Typography>
                <Typography >
                  <Link href='https://www.youtube.com/channel/UCJ0nWmB2-ADfn95r5cjmLJA/' target='_blank' underline='none' onClick={()=>ReactGA.event({ category: 'youtube-pdn', action: 'click' })}>
                    Videos
                  </Link>
                </Typography>
                <Typography >
                  <Link href='https://drive.google.com/drive/folders/1t_vGUfagr75TAZ8-E4NZfL-fU0BcsPlZ' target='_blank' underline='none' onClick={()=>ReactGA.event({ category: 'boletines-prensa', action: 'click' })}>
                    Boletines y prensa
                  </Link>
                </Typography>
                {/* <Typography variant='subtitle1'>Suscribete</Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CenterFooter;
