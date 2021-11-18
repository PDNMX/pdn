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

const useTab = makeStyles({
	root: {
		backgroundColor: '#f2f2f2',
		color: '#34b3eb',
		fontWeight: 'bolder',
		'&$root:hover': {
			backgroundColor: '#c3e8f4',
			color: '#000',
			fontWeight: 'bolder'
		}
	},
	selected: {
		backgroundColor: '#34b3eb',
		color: '#FFF',
		fontWeight: 'bolder'
	}
});

export default function MenuSuperior(props) {
	const classes = useStyles();
	const tabs = useTabs();
	const tab = useTab();

	return (
		<Paper square className={classes.root}>
			<Tabs
				classes={tabs}
				value={props.menuSuperior}
				onChange={props.handleChangeMenuSuperior}
				variant="fullWidth"
				aria-label="secciones de la declaración"
			>
				<Tab classes={tab} icon={<BusinessIcon />} label="SITUACIÓN PATRIMONIAL" />
				<Tab classes={tab} icon={<AccountBalanceIcon />} label="INTERESES" />
			</Tabs>
		</Paper>
	);
}
