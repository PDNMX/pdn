import React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import makeStyles from '@mui/styles/makeStyles';

import { Badge } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const useStyles = makeStyles(theme => ({
  root: {
    'backgroundColor': 'rgba(42, 116, 145)',
    'color': theme.palette.primario.contrastText,
    'fontSize': 12,
    'whiteSpace': 'normal',
    '&:hover': {
      color: 'white'
    }
  },
  selected: {
    backgroundColor: theme.palette.background.opaque,
    fontWeight: 'bolder',
    color: 'white'
  }
}));

const MyBadge = withStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1)
  },
  badge: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(1)
  }
}))(Badge);

export default function TypographyMenu(props) {
  const classes = useStyles();

  return (
    <MenuList style={{ backgroundColor: 'rgba(42, 116, 145)' }}>
      {props.opciones.map((opcion, index) => {
        return (
          <MenuItem key={'opcion-' + index} selected={props.value === index} onClick={e => props.setValue(e, index)} classes={classes}>
            <MyBadge badgeContent={opcion.valor ? opcion.valor : 0} color='error' anchorOrigin={{ vertical: 'top', horizontal: 'left' }} />
            {index + 1}. {opcion.clave}
          </MenuItem>
        );
      })}
    </MenuList>
  );
}
