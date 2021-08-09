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

const Cifras = props => {
    const {classes, dataSupplier} = props;

    const [state, setState] = React.useState({
        loading: true,
        error: false,
        contrataciones: 300000,
        instituciones: 0,
        donutChartData: [],
        periodo: {
            start: 2015,
            end: 2021
        },
        gastoTotal: 0
    });

    const prMethods = {
        open: {
            color: "#EB5468",
            label: "Licitación pública"
        },
        selective: {
            color: "#187099",
            label: "Invitación a tres"
        },
        direct: {
            color: "#B3AD1D",
            label: "Adjudicación directa"
        },
        other: {
            color: "#3CB3E6",
            label: "Otro"
        }
    };

    React.useEffect(() => {
        const supplier_id = dataSupplier;
        rp({
            uri: process.env.REACT_APP_S6_BACKEND + "/api/v1/summary",
            qs: {
                supplier_id
            },
            method: "GET",
            json: true
        }).then( data => {
            //console.log(data)
            const {open, selective, direct, other, total } = data.amounts;

            setState(s => ({
                ...s,
                loading: false,
                contrataciones: data.procedimientos,
                instituciones: data.instituciones,
                counts: data.counts,
                amounts: data.amounts,
                gastoTotal: total,
                donutChartDataType : 'amounts',
                donutChartData: [
                    {theta: open, label: porcentaje(open,total), color: prMethods.open.color, type: prMethods.open.label},
                    {theta: selective, label: porcentaje(selective,total), color: prMethods.selective.color, type: prMethods.selective.label},
                    {theta: direct, label: porcentaje(direct, total), color: prMethods.direct.color, type: prMethods.direct.label},
                    {theta: other, label: porcentaje(other, total), color: prMethods.other.color, type: prMethods.other.label}
                ]
            }));

        }).catch(error => {
            console.log(error);
            setState({ error: true })
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataSupplier]);

    const porcentaje = (amount, total) => {
        let p = (amount * 100 / total).toFixed(3);
        return `${p}%`
    };

    const handleSelectDonutData = p => {
        //console.log(p)
        const {open, direct, selective, other} = p ==='amounts' ? state.amounts: state.counts;
        const total = p === 'amounts' ? state.amounts.total : state.contrataciones;

        setState(s => ({
            ...s,
            donutChartDataType: p,
            donutChartData: [
                {theta: open, label: porcentaje(open,total), color: prMethods.open.color, type: prMethods.open.label},
                {theta: selective, label: porcentaje(selective,total), color: prMethods.selective.color, type: prMethods.selective.label},
                {theta: direct, label: porcentaje(direct, total), color: prMethods.direct.color, type: prMethods.direct.label},
                {theta: other, label: porcentaje(other, total), color: prMethods.other.color, type: prMethods.other.label}
            ]
        }));
    };

    return (
        <div className={classes.root}>
            {state.loading?
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
                            <b><CountUp separator="," start={1} end={state.contrataciones}/></b>
                        </Typography>

                        <Typography variant="h6" color="textPrimary">
                            Instituciones
                        </Typography>
                        <Typography variant="h5" paragraph color="textPrimary">
                            <b> <CountUp separator="," start={1} end={state.instituciones}/></b>
                        </Typography>

                        <Typography variant="h6" color="textPrimary">Gasto total</Typography>

                        <Typography variant="h5" paragraph color="textPrimary">
                            <b> <CountUp separator="," decimals={2} prefix={'$'} start={1} end={state.gastoTotal}/></b>
                        </Typography>

                        <Typography variant="h6" color="textPrimary">
                            Periodo
                        </Typography>
                        <Typography variant="h5" paragraph color="textPrimary">
                            <b>{state.periodo.start} - {state.periodo.end}</b>
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={12} lg={8} xl={8} className={classes.item}>
                        <Grid container spacing={0}>

                            <Grid item xs={12} md={6} lg={6} xl={6} align="center" className={classes.item}>
                                <CustomizedSelect handleSelectDonutData={handleSelectDonutData} dataType={state.donutChartDataType}/>
                                <Donutchart data={state.donutChartData} dataType={state.donutChartDataType}/>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6} xl={6} className={classes.item}>
                                {/*<Typography variant="h6" paragraph>Tipo de contratación</Typography>*/}
                                <ul className={classes.ul}>
                                    {
                                        Object.entries(prMethods).map(([attr, method], i) => (
                                                <li key={i}>
                                                    <Typography variant="h6" paragraph color="textPrimary">
                                                        <span className={classes.bullet} style={{backgroundColor: method.color}} />
                                                        {method.label}
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
    );
}


export default withStyles(styles)(Cifras);