import React from 'react';
import Footer from '../../Home/Footer'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PDNAppBar from "../../PDNAppBar/PDNAppBar";
import rp from 'request-promise';


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        maxWidth: 1200
    }
});


class Especificaciones extends React.Component{
    state = {
        oas: {},
        example: {}
    };

    componentDidMount() {

        let promises = [];
        promises.push(rp({
            url : 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json',
            method: 'GET',
            json: true
        }));

        promises.push({
            url : 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/example.json',
            method: 'GET',
            json: true
        });

        Promise.all( promises ).then(data => {
            this.setState({
                oas: data[0],
                example: data[1]
            })
        });
    }

    render(){

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <PDNAppBar/>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="h4">
                            Especificaciónes técnicas
                        </Typography>

                        <code>
                            {JSON.stringify(this.state.oas)}
                        </code>
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        );
    }

}

Especificaciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Especificaciones);