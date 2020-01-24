import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import BusinessIcon from '@material-ui/icons/Business';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import MenuLateral from './MenuLateral';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#f2f2f2'
	}
});

const Inicial = [
	'1. DATOS GENERALES',
	'2. DOMICILIO DEL DECLARANTE',
	'3. DATOS CURRICULARES DEL DECLARANTE',
	'4. DATOS DEL EMPLEO, CARGO O COMISIÓN QUE INICIA',
	'5. EXPERIENCIA LABORAL (ÚLTIMOS CINCO EMPLEOS)',
	'6. DATOS DE LA PAREJA',
	'7. DATOS DEL DEPENDIENTE ECONÓMICO',
	'8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SITUACIÓN ACTUAL)',
	'9. ¿TE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
	'10. BIENES INMUEBLES (SITUACIÓN ACTUAL)',
	'11. VEHÍCULOS (SITUACIÓN ACTUAL)',
	'12. BIENES MUEBLES (SITUACIÓN ACTUAL)',
	'13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (SITUACIÓN ACTUAL)',
	'14. ADEUDOS / PASIVOS (SITUACIÓN ACTUAL)',
	'15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)'
];

export default function MenuSuperior() {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);
	const [ menuPatrimonio, setMenuPatrimonio ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div style={{ width: '100%' }}>
			<Paper square className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="secondary"
					textColor="primary"
					aria-label="icon label tabs example"
				>
					<Tab icon={<BusinessIcon />} label="SITUACIÓN PATRIMONIAL" />
					<Tab icon={<AccountBalanceIcon />} label="INTERESES" />
				</Tabs>
			</Paper>
			<Paper square className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs={12} md={2}>
						<MenuLateral opciones={Inicial} />
					</Grid>
					<Grid item xs={12} md={10}>
						aaaa
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
