import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Donutchart from './Charts/SimpleRadialChart'
import CountUp from 'react-countup';
import rp from 'request-promise';
import LinearIndeterminate from './LinearIndeterminate';
import CustomizedSelect from './CustomizedSelect';


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2)
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
        loading: true,
        error: false,
        contrataciones: 300000,
        instituciones: 0,
        donutChartData: [],
        periodo: {
            start: 2017,
            end: 2018
        },
        gastoTotal: 0
    };

    componentWillMount() {

        rp({
            uri: process.env.REACT_APP_DUMMY_API + "/api/s6/summary",
            method: "GET",
            json: true
        }).then( data => {

            //console.log(data)

            this.setState({
                loading: false,
                contrataciones: data.procedimientos,
                instituciones: data.instituciones,
                counts: data.counts,
                amounts: data.amounts,
                gastoTotal: data.amounts.total,
                donutChartData: [
                    {theta: data.amounts.open, label: 'Licitación pública', color: "#00cc99"},
                    {theta: data.amounts.selective, label: 'Invitación a tres', color: "#ffcc00"},
                    {theta: data.amounts.direct, label: "Adjudicación directa", color: "#663399"},
                    {theta: data.amounts.other, label: "Otro", color: "#ff6600"}
                    ]
            })

        }).catch(error => {
            console.log(error);

            this.setState({ error: true })
        });

    }

    handleSelectDonutData= (p) => {
        //console.log(p)
        if (p === 'amounts'){
            this.setState({
                donutChartData: [
                    {theta: this.state.amounts.open, label: 'Licitación pública', color: "#00cc99"},
                    {theta: this.state.amounts.selective, label: 'Invitación a tres', color: "#ffcc00"},
                    {theta: this.state.amounts.direct, label: "Adjudicación directa", color: "#663399"},
                    {theta: this.state.amounts.other, label: "Otro", color: "#ff6600"}
                ]
            });
        } else {
            this.setState({
                donutChartData: [
                    {theta: this.state.counts.open, label: 'Licitación pública', color: "#00cc99"},
                    {theta: this.state.counts.selective, label: 'Invitación a tres', color: "#ffcc00"},
                    {theta: this.state.counts.direct, label: "Adjudicación directa", color: "#663399"},
                    {theta: this.state.counts.other, label: "Otro", color: "#ff6600"}
                ]
            });
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
                {this.state.loading?
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <LinearIndeterminate/>
                        </Grid>
                    </Grid>:
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={12} lg={4} xl={4} align="center">
                            <Typography variant="h6">
                                Procesos de contratación
                            </Typography>

                            <Typography variant="h5" paragraph>
                                <b><CountUp separator="," start={1} end={this.state.contrataciones}/></b>
                            </Typography>

                            <Typography variant="h6">
                                Instituciones
                            </Typography>
                            <Typography variant="h5" paragraph>
                                <b> <CountUp separator="," start={1} end={this.state.instituciones}/></b>
                            </Typography>

                            <Typography variant="h6">Gasto total</Typography>

                            <Typography variant="h5" paragraph>
                                <b> <CountUp separator="," decimals={2} prefix={'$'} start={1} end={this.state.gastoTotal}/></b>
                            </Typography>

                            <Typography variant="h6">
                                Periodo
                            </Typography>
                            <Typography variant="h5" paragraph>
                                <b>{this.state.periodo.start} - {this.state.periodo.end}</b>
                            </Typography>

                        </Grid>

                        <Grid item xs={12} md={12} lg={8} xl={8}>

                            <Grid container spacing={0}>
                                <Grid item xs={12} md={6} lg={6} xl={6} align="center">
                                    <CustomizedSelect handleSelectDonutData={this.handleSelectDonutData}/>

                                    <Donutchart data={this.state.donutChartData}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={6}>

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
                }
            </div>
        )
    }
}


export default withStyles(styles) (Cifras);