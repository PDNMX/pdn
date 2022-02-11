import { Box, Button, Grid } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
    'backgroundColor': '#9eb1b6',
    'borderRadius': '50px',
    'fontWeight': 'bold',
    'fontStyle': 'italic',
    '&:hover': {
      backgroundColor: '#56a3bf'
    }
  }
}));

export default ({ text, href }) => {
  const classes = useStyles();
  return (
    <div>
      <Box>
        <Button variant='contained' className={classes.button} href={href}>
          {text}
        </Button>
      </Box>
    </div>
  );
};
