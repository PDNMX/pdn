import { Box, Button } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
    'borderRadius': '50px',
    'fontWeight': 'bold',
    'fontStyle': 'italic',
    '&:hover': {
      backgroundColor: '#56a3bf'
    }
  },
  link: {
    'textDecoration': 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const MyButton = ({ text, href }) => {
  const classes = useStyles();
  return (
    <Box>
      <Button variant='contained' className={classes.button} href={href}>
        {text}
      </Button>
    </Box>
  );
};

export default MyButton;
