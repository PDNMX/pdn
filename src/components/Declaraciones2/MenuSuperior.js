import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#f2f2f2'
  }
});

const useTabs = makeStyles({
  indicator: {
    backgroundColor: 'transparent'
  }
});

const useTab = makeStyles(theme => ({
  root: {
    'backgroundColor': theme.palette.background.opaque,
    'color': theme.palette.secundario.light,
    '&:hover': {
      fontWeight: 'bolder',
      color: theme.palette.primario.contrastText
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(42, 116, 145)',
      color: theme.palette.secundario.main,
      fontWeight: 'bolder'
    }
  }
}));

export default function MenuSuperior(props) {
  const classes = useStyles();
  const tabs = useTabs();
  const tab = useTab();

  return (
    <Paper square className={classes.root}>
      <Tabs classes={tabs} value={props.menuSuperior} onChange={props.handleChangeMenuSuperior} variant='fullWidth' aria-label='secciones de la declaración'>
        <Tab classes={tab} icon={<BusinessIcon />} label='SITUACIÓN PATRIMONIAL' />
        <Tab classes={tab} icon={<AccountBalanceIcon />} label='INTERESES' />
      </Tabs>
    </Paper>
  );
}
