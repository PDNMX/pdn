import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styleSecciones from './styleSecciones';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, seccion: props.seccion };
	}

	componentDidCatch(error, info) {
		console.log('info: ', info);
		console.log('error: ', error);
		console.log('seccion: ', this.state.seccion);
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service

		// logErrorToMyService(error, info);
	}

	render() {
		let { classes } = this.props;
		if (this.state.hasError) {
			return (
				<Grid item xs={12}>
					<Typography className={classes.alertDanger} align="center">
						Algo ha salido mal...
					</Typography>
				</Grid>
			);
		}
		return this.props.children;
	}
}

export default withStyles(styleSecciones)(ErrorBoundary);