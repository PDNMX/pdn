import { BoxAccordion, BoxAccordionDetails, BoxAccordionSummary } from './common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timelapse from '@mui/icons-material/Timelapse';

import makeStyles from '@mui/styles/makeStyles';
import styles from './style';
import { Grid, Typography, Tooltip } from '@mui/material';

const useStyles = makeStyles(styles);

const MantenimentResultProv = props => {
  const classes = useStyles();
  const { p } = props;
  return (
    <BoxAccordion>
      <BoxAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header' className={classes.resultadosTituloMantenimiento} style={{ backgroundColor: '#227292' }}>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography className={classes.resultadosHeading}>{p.supplier_name}</Typography>
            <Typography className={classes.resultadosHeading}>[{p.levels.join(', ')}]</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <Typography className={classes.resultadosHeading}>
                  <Tooltip title={'En mantenimiento'}>
                    <Timelapse style={{ color: '#F7E455' }} />
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.resultadosHeading} style={{ color: '#F7E455' }}>
                  En mantenimiento
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <BoxAccordionDetails style={{ backgroundColor: '#1d5d75' }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography className={classes.alertSuccess} align='center'>
              En este momento esta API se encuentra en proceso de Mantenimiento, por favor vuelve a revisar mas tarde.
            </Typography>
          </Grid>
        </Grid>
      </BoxAccordionDetails>
    </BoxAccordion>
  );
};

export default MantenimentResultProv;
