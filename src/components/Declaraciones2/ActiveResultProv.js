import { BoxAccordion, BoxAccordionDetails, BoxAccordionSummary } from './common/BoxAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import IconSunny from '@mui/icons-material/WbSunny';

import makeStyles from '@mui/styles/makeStyles';
import styles from './style';
import { Grid, Tooltip, Typography } from '@mui/material';

import Tabla from './Tabla';

const useStyles = makeStyles(styles);

const ActiveResultProv = props => {
  const classes = useStyles();
  const { p, i, handleDataSelect, handleSetPage, handleChangeRowsPerPage } = props;

  return (
    <BoxAccordion square key={'res-' + i}>
      <BoxAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography className={classes.resultadosHeading}>{p.supplier_name}</Typography>
            <Typography className={classes.resultadosHeading}>[{p.levels.join(', ')}]</Typography>
          </Grid>
          {p.finding ? (
            <Grid item xs={4}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <CircularProgress color='secundario' size={20} />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={4}>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <Typography className={classes.resultadosHeading}>
                    <Tooltip title={p.estatus ? 'Con respuesta' : 'Sin respuesta: ' + p.error.status + ' ' + p.error.statusText}>
                      <IconSunny color={p.estatus ? 'secundario' : 'inherit'} />
                    </Tooltip>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography className={classes.resultadosHeading}> Total de registros: {new Intl.NumberFormat('es-MX').format(p.total)} </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </BoxAccordionSummary>
      {!p.finding && (
        <BoxAccordionDetails>
          {p.data.length > 0 && <Tabla rows={p.data} pagination={p.pagination} handleDataSelect={handleDataSelect} handleSetPage={handleSetPage} handleChangeRowsPerPage={handleChangeRowsPerPage} posicion={i} />}

          {p.error && (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.alertWarning} align='center'>
                  No se logro establecer la conexión con el proveedor, por favor intenta nuevamente mas tarde.
                </Typography>
              </Grid>
            </Grid>
          )}
        </BoxAccordionDetails>
      )}
    </BoxAccordion>
  );
};

export default ActiveResultProv;
