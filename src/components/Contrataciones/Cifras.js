import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Donutchart from './Charts/SimpleRadialChart'
import CountUp from 'react-countup';
//import rp from 'request-promise';


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    bullet: {
        backgroundColor: '#89d4f2',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        marginRight: "10px",
        marginBottom: '-3px'
    },
    ul: {
        listStyle: 'none',
        //marginLeft: 0,
        paddingLeft: '20px'
    },
    li: {
        paddingBottom: theme.spacing(2)
    },
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


        const bullets = [
            {
                color: "#00cc99",
                tipo: "Licitación pública"
            },
            {
                color: "#ffcc00",
                tipo: "Invitación a tres"
            },
            {
                color: "#663399",
                tipo: "Adjudicación directa"
            },
            {
                color: "#ff6600",
                tipo: "Otra"
            }
        ];

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12} lg={5} xl={5}>
                        <Typography variant="h6">
                             Procesos de contratación:
                        </Typography>

                        <Typography variant="h5" paragraph>
                            <b><CountUp separator="," start={1} end={this.state.contrataciones}/></b>
                        </Typography>

                        <Typography variant="h6">
                            Instituciones:
                        </Typography>
                        <Typography variant="h5" paragraph>
                            <b> <CountUp separator="," start={1} end={this.state.instituciones}/></b>
                        </Typography>

                        <Typography variant="h6">
                            Periodo:
                        </Typography>
                        <Typography variant="h5" paragraph>
                            <b>{this.state.periodo.start} - {this.state.periodo.end}</b>
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={12} lg={7} xl={7}>

                        <Grid container spacing={0}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                        <Donutchart/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>

                                <ul className={classes.ul}>
                                    {
                                        bullets.map((b, i) => (
                                            <li key={i}>
                                                <Typography variant="h6" paragraph>
                                                    <span className={classes.bullet} style={{backgroundColor: b.color}} />
                                                    {b.tipo}
                                                </Typography>
                                            </li>
                                            )
                                        )}
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