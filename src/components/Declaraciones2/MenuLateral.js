import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	boton: {
		padding: '5px 10px',
		fontSize: 12
	}
});

export default function TypographyMenu(props) {
	const classes = useStyles();

	return (
		<Paper>
			<MenuList>
				{props.opciones.map((opcion, index) => {
					return (
						<MenuItem key={'opcion-' + index}>
							<Typography style={{ whiteSpace: 'normal' }} className={classes.boton}>
								{opcion}
							</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		</Paper>
	);
}
