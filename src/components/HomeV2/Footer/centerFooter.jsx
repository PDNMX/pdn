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
      <Grid display={'flex'} className='columna-central' item xs={5}  >
        <Grid item className='texto-izq'>
          <Link href='https://www.plataformadigitalnacional.org/mapa-avance/' target='_blank' underline='none' onClick={()=>ReactGA.pageview('/mapa-avance')}>
            Avances de Interconexión
          </Link>
          <Link href='https://mda.plataformadigitalnacional.org/' target='_blank' underline='none' onClick={()=>ReactGA.pageview('/mda')}>
            Mercado Digital Anticorrupción
          </Link> 
        </Grid>
        <Grid item className='col2' >
          
        </Grid>
        <Grid item className='texto-der'>
          <RouterLink to={'/faq'}>
            Preguntas frecuentes
          </RouterLink>
          <Link href='https://www.youtube.com/channel/UCJ0nWmB2-ADfn95r5cjmLJA/' target='_blank' underline='none' onClick={()=>ReactGA.event({ category: 'youtube-pdn', action: 'click' })}>
            Videos
          </Link>
          <Link href='https://drive.google.com/drive/folders/1t_vGUfagr75TAZ8-E4NZfL-fU0BcsPlZ' target='_blank' underline='none' onClick={()=>ReactGA.event({ category: 'boletines-prensa', action: 'click' })}>
            Boletines y prensa
          </Link>
        </Grid>
      </Grid>
  );
};

export default CenterFooter;
