import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import BarChart from './Charts/BarChart';
import SuppliersBarChart from './Charts/SuppliersBarChart';

import rp from 'request-promise';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});


class Top extends React.Component {

    state = {
        barChartData: [],
        suppliers: []
    };

    componentWillMount() {

        let queries = [
            rp({
                uri: process.env.REACT_APP_DUMMY_API + '/api/s6/top/10/buyers',
                method :'GET',
                json: true
            }),
            rp({
                uri: process.env.REACT_APP_DUMMY_API + '/api/s6/top/10/suppliers',
                method :'GET',
                json: true
            })
        ];

        Promise.all(queries).then( data => {
            console.log(data)
            this.setState({
                barChartData: data[0],
                suppliers: data[1]
            })
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="h6">Top 10 unidades compradoras</Typography>
                        <BarChart data = {this.state.barChartData}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="h6"> Top 10 proveedores</Typography>
                        <SuppliersBarChart data={this.state.suppliers}/>
                    </Grid>
                </Grid>
            </div>
        );

    }
}

export default withStyles(styles)(Top);