import React from 'react';
import {withStyles} from "@mui/styles";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
//import Donutchart from './Charts/SimpleRadialChart'
import NivoPie from "./Charts/NivoPie";
import CountUp from 'react-countup';
import axios from 'axios';
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

const CustomTypography = withStyles(theme => ({
    root: {
        color: theme.palette.text.main
    }
}))(Typography);

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
            end: 2023
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
        axios({
            url: process.env.REACT_APP_S6_BACKEND + "/api/v1/summary",
            params: {
                supplier_id
            },
            method: "GET",
            json: true
        }).then( res => {
            //console.log(data)
            const {open, selective, direct, other, total } = res.data.amounts;

            setState(s => ({
                ...s,
                loading: false,
                contrataciones: res.data.procedimientos,
                instituciones: res.data.instituciones,
                counts: res.data.counts,
                amounts: res.data.amounts,
                gastoTotal: total,
                donutChartDataType : 'amounts',
                /*donutChartData: [
                    {theta: open, label: porcentaje(open,total), color: prMethods.open.color, type: prMethods.open.label},
                    {theta: selective, label: porcentaje(selective,total), color: prMethods.selective.color, type: prMethods.selective.label},
                    {theta: direct, label: porcentaje(direct, total), color: prMethods.direct.color, type: prMethods.direct.label},
                    {theta: other, label: porcentaje(other, total), color: prMethods.other.color, type: prMethods.other.label}
                ],*/
                nivoPieData: [
                    {id: "Licitación", label: prMethods.open.label, value: open, color: "hsl(106, 70%, 50%)"},
                    {id: "Invitación a tres", label: prMethods.selective.label, value: selective, color: "hsl(358, 70%, 50%)"},
                    {id: "Adjudicación directa", label: prMethods.direct.label, value: direct, color: "hsl(249, 70%, 50%)"},
                    {id: "Otro", label: prMethods.other.label, value: other, color: "hsl(241, 70%, 50%)"}
                ]
            }));

        }).catch(error => {
            console.log(error);
            setState({ error: true })
        });
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
            /*donutChartData: [
                {theta: open, label: porcentaje(open,total), color: prMethods.open.color, type: prMethods.open.label},
                {theta: selective, label: porcentaje(selective,total), color: prMethods.selective.color, type: prMethods.selective.label},
                {theta: direct, label: porcentaje(direct, total), color: prMethods.direct.color, type: prMethods.direct.label},
                {theta: other, label: porcentaje(other, total), color: prMethods.other.color, type: prMethods.other.label}
            ],*/
            nivoPieData: [
                {id: "Licitación", label: prMethods.open.label, value: open, color: "hsl(106, 70%, 50%)"},
                {id: "Invitación a tres", label: prMethods.selective.label, value: selective, color: "hsl(358, 70%, 50%)"},
                {id: "Adjudicación directa", label: prMethods.direct.label, value: direct, color: "hsl(249, 70%, 50%)"},
                {id: "Otro", label: prMethods.other.label, value: other, color: "hsl(241, 70%, 50%)"}
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
                        <CustomTypography variant="h6" color="textPrimary">
                            Procesos de contratación
                        </CustomTypography>

                        <CustomTypography variant="h5" paragraph color="textPrimary">
                            <b><CountUp separator="," start={1} end={state.contrataciones}/></b>
                        </CustomTypography>

                        <CustomTypography variant="h6" color="textPrimary">
                            Instituciones
                        </CustomTypography>

                        <CustomTypography variant="h5" paragraph color="textPrimary">
                            <b> <CountUp separator="," start={1} end={state.instituciones}/></b>
                        </CustomTypography>

                        <CustomTypography variant="h6" color="textPrimary">Gasto total</CustomTypography>

                        <CustomTypography variant="h5" paragraph color="textPrimary">
                            <b> <CountUp separator="," decimals={2} prefix={'$'} start={1} end={state.gastoTotal}/></b>
                        </CustomTypography>

                        {dataSupplier && dataSupplier === 'SHCP' && <div>
                            <CustomTypography variant="h6" color="textPrimary">
                                Periodo
                            </CustomTypography>

                            <CustomTypography variant="h5" paragraph color="textPrimary">
                                <b>{state.periodo.start} - {state.periodo.end}</b>
                            </CustomTypography>
                        </div>
                        }

                    </Grid>

                    <Grid item xs={12} md={12} lg={8} xl={8} className={classes.item}>
                        <Grid container spacing={0}>

                            <Grid item xs={12} md={12} lg={12} xl={12} align="center" className={classes.item}>
                                <CustomizedSelect handleSelectDonutData={handleSelectDonutData} dataType={state.donutChartDataType}/>
                                { /*<Donutchart data={state.donutChartData} dataType={state.donutChartDataType}/>*/}

                                <div style={{ height: 250, width: '100%'}}>
                                    <NivoPie
                                        data={state.nivoPieData}
                                        //total={state.gastoTotal} //falta
                                        dataType={state.donutChartDataType}
                                    />
                                </div>

                            </Grid>

                            {/*<Grid item xs={12} md={6} lg={6} xl={6} className={classes.item}>

                                <ul className={classes.ul}>
                                    {
                                        Object.entries(prMethods).map(([attr, method], i) => (
                                                <li key={i}>
                                                    <CustomTypography variant="h6" paragraph color="textPrimary">
                                                        <span className={classes.bullet} style={{backgroundColor: method.color}} />
                                                        {method.label}
                                                    </CustomTypography>
                                                </li>
                                            )
                                        )}
                                </ul>
                            </Grid>*/}

                        </Grid>
                    </Grid>
                </Grid>
            }
        </div>
    );
}


export default withStyles(styles)(Cifras);
