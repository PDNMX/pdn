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
        //paddingTop: theme.spacing(4),
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
        paddingLeft: '20px',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 80
        }
    },
    li: {
        paddingBottom: theme.spacing(2)
    },
    item: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    }
});

class Cifras extends React.Component{

    state = {
        loading: true,
        error: false,
        contrataciones: 300000,
        instituciones: 0,
        donutChartData: [],
        periodo: {
            start: 2015,
            end: 2021
        },
        gastoTotal: 0,
        colors: {
            open: "#EB5468",
            selective: "#187099",
            direct: "#B3AD1D",
            other: "#3CB3E6"
        }
    };

    porcentaje = (amount, total) => {
        let p = (amount * 100 / total).toFixed(3);
        return `${p}%`
    };

    componentWillMount() {

        rp({
            uri: process.env.REACT_APP_S6_BACKEND + "/api/v1/summary",
            method: "GET",
            json: true
        }).then( data => {

            //console.log(data)

            const {open, selective, direct, other, total } = data.amounts;
            const {colors} = this.state;

            this.setState({
                loading: false,
                contrataciones: data.procedimientos,
                instituciones: data.instituciones,
                counts: data.counts,
                amounts: data.amounts,
                gastoTotal: total,
                donutChartDataType : 'amounts',
                donutChartData: [
                    {theta: open, label: this.porcentaje(open,total), color: colors.open, type: "Licitación pública"},
                    {theta: selective, label: this.porcentaje(selective,total), color: colors.selective, type: "Invitación a tres"},
                    {theta: direct, label: this.porcentaje(direct, total), color: colors.direct, type: "Adjudicación directa"},
                    {theta: other, label: this.porcentaje(other, total), color: colors.other, type: "Otro"}
                    ]
            })

        }).catch(error => {
            console.log(error);

            this.setState({ error: true })
        });

    }

    handleSelectDonutData = (p) => {
        //console.log(p)
        const {colors} = this.state;

        if (p === 'amounts'){
            const {open, direct, selective, other, total} = this.state.amounts;

            this.setState({
                donutChartDataType: p,
                donutChartData: [
                    {theta: open, label: this.porcentaje(open,total), color: colors.open, type: "Licitación pública"},
                    {theta: selective, label: this.porcentaje(selective,total), color: colors.selective, type: "Invitación a tres"},
                    {theta: direct, label: this.porcentaje(direct, total), color: colors.direct, type: "Adjudicación directa"},
                    {theta: other, label: this.porcentaje(other, total), color: colors.other, type: "Otro"}
                ]
            });

        } else {
            const {open, direct, selective, other} = this.state.counts;
            const total = this.state.contrataciones;

            this.setState({
                donutChartDataType: p,
                donutChartData: [
                    {theta: open, label: this.porcentaje(open,total), color: colors.open, type: "Licitación pública"},
                    {theta: selective, label: this.porcentaje(selective,total), color: colors.selective, type: "Invitación a tres"},
                    {theta: direct, label: this.porcentaje(direct, total), color: colors.direct, type: "Adjudicación directa"},
                    {theta: other, label: this.porcentaje(other, total), color: colors.other, type: "Otro"}
                ]
            });
        }
    };


    render(){

        const {classes} = this.props;


        const bullets = [
            {
                color: this.state.colors.open,
                tipo: "Licitación pública"
            },
            {
                color: this.state.colors.selective,
                tipo: "Invitación a tres"
            },
            {
                color: this.state.colors.direct,
                tipo: "Adjudicación directa"
            },
            {
                color: this.state.colors.other,
                tipo: "Otro"
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
                        <Grid item xs={12} md={12} lg={4} xl={4} align="center" className={classes.item}>
                            <Typography variant="h6" color="textPrimary">
                                Procesos de contratación
                            </Typography>

                            <Typography variant="h5" paragraph color="textPrimary">
                                <b><CountUp separator="," start={1} end={this.state.contrataciones}/></b>
                            </Typography>

                            <Typography variant="h6" color="textPrimary">
                                Instituciones
                            </Typography>
                            <Typography variant="h5" paragraph color="textPrimary">
                                <b> <CountUp separator="," start={1} end={this.state.instituciones}/></b>
                            </Typography>

                            <Typography variant="h6" color="textPrimary">Gasto total</Typography>

                            <Typography variant="h5" paragraph color="textPrimary">
                                <b> <CountUp separator="," decimals={2} prefix={'$'} start={1} end={this.state.gastoTotal}/></b>
                            </Typography>

                            <Typography variant="h6" color="textPrimary">
                                Periodo
                            </Typography>
                            <Typography variant="h5" paragraph color="textPrimary">
                                <b>{this.state.periodo.start} - {this.state.periodo.end}</b>
                            </Typography>

                        </Grid>

                        <Grid item xs={12} md={12} lg={8} xl={8} className={classes.item}>
                            <Grid container spacing={0}>

                                <Grid item xs={12} md={6} lg={6} xl={6} align="center" className={classes.item}>
                                    <CustomizedSelect handleSelectDonutData={this.handleSelectDonutData} dataType={this.state.donutChartDataType}/>
                                    <Donutchart data={this.state.donutChartData} dataType={this.state.donutChartDataType}/>
                                </Grid>

                                <Grid item xs={12} md={6} lg={6} xl={6} className={classes.item}>
                                    {/*<Typography variant="h6" paragraph>Tipo de contratación</Typography>*/}
                                    <ul className={classes.ul}>
                                        {
                                            bullets.map((b, i) => (
                                                    <li key={i}>
                                                        <Typography variant="h6" paragraph color="textPrimary">
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