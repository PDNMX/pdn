import Toolbar from '@mui/material/Toolbar';
import { lighten } from '@mui/material/styles';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.contrastText
  }
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.title}>
      <Typography paragraph variant='h6' style={{color: 'white'}} id='tableTitle'>
        Pulsa sobre el registro para ver su detalle
      </Typography>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
