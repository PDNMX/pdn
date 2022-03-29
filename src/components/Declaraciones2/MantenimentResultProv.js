import { BoxAccordion, BoxAccordionSummary } from './common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import makeStyles from '@mui/styles/makeStyles';
import styles from './style';
import { Grid, Typography } from '@mui/material';

const useStyles = makeStyles(styles);

const MantenimentResultProv = props => {
  const classes = useStyles();
  const { p } = props;
  return (
    <BoxAccordion>
      <BoxAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header' className={classes.resultadosTituloMantenimiento}>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography className={classes.resultadosHeading}>
              {p.supplier_name} [{p.levels.join(', ')}]
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.resultadosHeading}>En mantenimiento</Typography>
          </Grid>
        </Grid>
      </BoxAccordionSummary>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.alertWarning} align='center'>
            En este momento esta API se encuentra en proceso de Mantenimiento, por favor vuelve a revisar mas tarde.
          </Typography>
        </Grid>
      </Grid>
    </BoxAccordion>
  );
};

export default MantenimentResultProv;
