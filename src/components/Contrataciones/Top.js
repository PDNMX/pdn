import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import BarChart from './Charts/BarChart';
import rp from 'request-promise';
const styles = theme => ({
    root: {
        flexGrow: 1
    }
});


class Top extends React.Component {

    state = {
        barChartData: []
    };

    componentWillMount() {

        rp({
            uri: process.env.REACT_APP_DUMMY_API + '/api/s6//top/10/buyers',
            method :'GET',
            json: true
        }).then( data => {
            this.setState({barChartData: data})
        });
    }


    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Typography>Top 10 unidades compradoras</Typography>

                <BarChart data = {this.state.barChartData}/>
            </div>
        );

    }
}

export default withStyles(styles)(Top);