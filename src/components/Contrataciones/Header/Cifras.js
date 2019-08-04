import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Donutchart from '../Charts/SimpleRadialChart'
import CountUp from 'react-countup';
//import rp from 'request-promise';


const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Cifras extends React.Component{

    state = {
        contrataciones: 300000,
        instituciones: 200,
        periodo: {
            start: 2017,
            end: 2018
        }
    };


    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={5}>
                        <Typography variant="h6">
                             Procesos de contratación:
                        </Typography>

                        <Typography variant="h5" paragraph>
                            <b><CountUp start={1} end={this.state.contrataciones}/></b>
                        </Typography>

                        <Typography variant="h6">
                            Instituciones:
                        </Typography>
                        <Typography variant="h5" paragraph>
                            <b> <CountUp start={1} end={this.state.instituciones}/></b>
                        </Typography>

                        <Typography variant="h6">
                            Periodo:
                        </Typography>
                        <Typography variant="h5" paragraph>
                            <b>{this.state.periodo.start} - {this.state.periodo.end}</b>
                        </Typography>

                    </Grid>

                    <Grid item xs={7}>

                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                        <Donutchart/>
                            </Grid>
                            <Grid item xs={6}>

                                <ul>
                                    <li><Typography variant="h6">Licitación pública</Typography></li>
                                    <li><Typography variant="h6">Invitación a tres</Typography></li>
                                    <li><Typography variant="h6">Adjudicación directa</Typography></li>
                                    <li><Typography variant="h6">Otra</Typography></li>
                                </ul>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
        )
    }
}


export default withStyles(styles) (Cifras);