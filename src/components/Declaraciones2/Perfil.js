import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './style';

class Perfil extends React.Component {
	render() {
		let { classes, data } = this.props;
		console.log(data);
		return (
			<div>
				<Grid container spacing={0} className={classes.perfilRoot}>
					<Grid item xs={12}>
						<Paper className={classes.root}>
							<Typography variant="h5" component="h3">
								This is a sheet of paper.
							</Typography>
							<Typography component="p">
								Paper can be used to build surface or other elements for your application.
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Perfil);
