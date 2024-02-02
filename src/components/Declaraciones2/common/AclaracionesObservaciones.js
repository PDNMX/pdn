import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import style from '../styleSecciones';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles(style);

const AclaracionesObservacions = props => {
  const classes = useStyles();

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.cardTitle}>ACLARACIONES/OBSERVACIONES</Typography>
            <Typography className={classes.cardReserved}>NO PÚBLICO</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default AclaracionesObservacions;
