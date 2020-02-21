import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#34b3eb',
		color: 'rgba(255, 255, 255, 0.6)',
		fontSize: 12,
		whiteSpace: 'normal',
		'&$root:hover': {
			fontWeight: 'bolder',
			color: '#FFF'
		}
	},
	selected: {
		backgroundColor: '#c3e8f4',
		fontWeight: 'bolder',
		color: '#FFF'
	}
});

const MyBadge = withStyles((theme) => ({
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
		<MenuList>
			{props.opciones.map((opcion, index) => {
				return (
					<MenuItem
						key={'opcion-' + index}
						selected={props.value === index}
						onClick={(e) => props.setValue(e, index)}
						classes={classes}
					>
						<MyBadge
							badgeContent={opcion.valor ? opcion.valor : 0}
							color="error"
							anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
						/>
						{opcion.clave}
					</MenuItem>
				);
			})}
		</MenuList>
	);
}
