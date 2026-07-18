import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'tss-react/mui';

import { Badge } from '@mui/material';
import { withStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => ({
  root: {
    'backgroundColor': theme.palette.primary.main,
    'color': theme.palette.text.clear,
    'fontSize': 12,
    'whiteSpace': 'normal',
    '&:hover': {
      color: 'white'
    }
  },
  selected: {
    backgroundColor: theme.palette.background.select,
    fontWeight: 'bolder',
    color: 'white'
  }
}));

const MyBadge = withStyles(Badge, theme => ({
  root: {
    padding: theme.spacing(0, 1)
  },
  badge: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(1)
  }
}));

export default function TypographyMenu(props) {
  const { classes } = useStyles();

  return (
    <MenuList style={{ backgroundColor: '#b25fac' }}>
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
