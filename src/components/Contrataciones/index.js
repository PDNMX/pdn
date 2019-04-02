import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Header from "../PDNAppBar/PDNAppBar";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Card from "./CardChart";
import Grafica2 from "./Grafica2";
import Grafica3 from "./Grafica3";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        }
    },
    subroot: {
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            width:'100%'
        }

    },
    paperIzquierdo:{
        backgroundColor: theme.palette.grey.color,
        height:'100%',
        width:'100%',
        color:theme.palette.fontLight.color,
    },
    paperDerecho:{
        height:'95%%',
        width:'100%',
        /*paddingLeft:"3rem",
        paddingTop:"3rem"*/
    },
    titleBox:{
        color: theme.palette.fontLight.color,
        backgroundColor: theme.palette.greyTitle.color,
        paddingTop:'1rem',
        paddingBottom:'1rem',
        paddingLeft:'6rem',
        paddingRight:'2rem',
        fontSize:'1rem',
        display:'inline-block',
        fontWeight:700,
        marginLeft:"-3rem",
        marginBottom: "2rem"

    },
    seccion:{
        padding:"2rem"
    },
    fontLight:{
        color: theme.palette.fontLight.color,

    },
    section: {
        maxWidth: '1024px'
    }
});

let g2 = <Grafica2/>;
let g3 = <Grafica3/>;
class Index extends React.Component {
    state = {
        age: '',
        open: false,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">
                                Contrataciones públicas
                            </Typography>
                            <Typography variant={"body1"}>
                                Se muestra un
                                <Select
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    defaultValue={10}
                                    inputProps={{
                                        name: 'age',
                                        id: 'demo-controlled-open-select',
                                    }}
                                >
                                    <MenuItem value={10}>resumen</MenuItem>
                                    <MenuItem value={20}>puntualidad</MenuItem>
                                    <MenuItem value={30}>eficiencia en costos</MenuItem>
                                    <MenuItem value={40}>equidad</MenuItem>
                                </Select>
                                del proceso de contratación para
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={0}>
                        <Grid item md={4} sm={12} className={classes.subroot}>
                            <Paper className={classes.paperIzquierdo}>
                                <div className={classes.seccion}>
                                    <Typography variant="headline" className={classes.titleBox}>
                                        Resumen
                                    </Typography>
                                    <Typography variant="body1" className={classes.fontLight}>
                                        It is a long established fact that a reader will be distracted by the readable content of a page
                                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                                        distribution of letters
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item md={8} sm={12}>
                            <Paper className={classes.paperDerecho}>
                                <Card titleCard={"Contratos"} content={g3} descripcion={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"}/>
                                <Card titleCard={"Monto"} content={g2} descripcion = {"El valor de los contratos en el conjunto de datos"}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div>


        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);