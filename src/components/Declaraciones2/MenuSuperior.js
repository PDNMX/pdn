import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
	root: {
		width: '100%'
	}
});

export default function MenuSuperior() {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction label="DECLARACIÓN DE SITUACIÓN PATRIMONIAL" icon={<RestoreIcon />} />
			<BottomNavigationAction label="DECLARACIÓN DE INTERESES" icon={<FavoriteIcon />} />
		</BottomNavigation>
	);
}
