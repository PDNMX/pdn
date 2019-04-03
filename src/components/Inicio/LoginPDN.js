import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LogoPDN from '../../assets/PDN.png';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Modal from "@material-ui/core/Modal/Modal";
import Divider from '@material-ui/core/Divider';
import PDNAppBar from '../PDNAppBar/PDNAppBar';
import app from "../../config/firebase";
import {withRouter} from "react-router-dom";
import {haySesion} from "../Seguridad/seguridad";

const styles = theme => ({
    item: {
        marginTop: "150px",
        maxWidth: '500px'
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,
        width: "100%"
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    card: {
        minWidth: 275,
        background: '#f5f5f5'
    },
    title: {
        fontSize: 14
    },
    mensaje:{
        color : 'red'
    },
    button: {
        background: '#ffe01b',
    },
    btnReestablecer:{
        fontSize: 'x-small',
        color : theme.palette.primary.dark
    },
    divider :{
        marginTop: 50,
        marginBottom: 20
    }
});


class LoginPDN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            mensaje: "",
            loading:false
        };
    }

    componentWillMount(){
         haySesion().then(result=>{
            if(result) this.props.history.push('/')
         })
    };

    handleSignIn = (email, pass) => {
        try {
            app.auth().signInWithEmailAndPassword(email, pass).then((resp) => {
                if (!resp.user.emailVerified) {
                    this.setState(
                        {
                            mensaje: 'El correo electrónico no ha sido validado. Revisa tu bandeja de entrada y sigue las instrucciones.'
                        }, () => {
                            let user = app.auth().currentUser;
                            user.sendEmailVerification().then(function () {
                            }).catch(function (err) {
                                console.log("Error: ", err);
                            })
                        })
                }
                else {
                    this.props.history.push('/');
                }
            }).catch(error => {
                console.log("Error con signInWithEmailAndPassword ", error);
                this.setState({
                    mensaje: error.code === 'auth/invalid-email' ? 'El correo electrónico no es válido' : error.code === 'auth/user-disabled' ? 'El usuario ha sido deshabilitado' : error.code === 'auth/user-not-found' ?
                        'El correo electrónico no esta dado de alta' : 'La contraseña es invalida o la cuenta no tiene una contraseña'
                })
            });

        } catch (e) {
            this.setState({
                mensaje: e
            })
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClick = () => {
        this.setState({loading:true},()=>{
            this.handleSignIn(this.state.email, this.state.pass, this.props.history);
        });
        this.setState({loading:false})
    };

    handleRecoverPass = () =>{
        this.props.handleRecovery(this.state.email)
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                <PDNAppBar/>
            <Grid container spacing={24} justify='center'>
                <Grid item xs={12} className={classes.item}>
                    <Card className={classes.card}>
                        <CardContent style={{textAlign: "center"}}>
                            <form autoComplete="off">
                                <Grid item xs={12}>
                                    <br/>
                                    <img
                                        src={LogoPDN}
                                        className="img-fluid"
                                        alt="PDN"
                                        style={{
                                            maxWidth: 150
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.loading &&
                                        <Modal
                                            open={this.state.loading}
                                            disableAutoFocus={true}
                                        >
                                            <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                                        </Modal>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        label="Correo electrónico"
                                        className={classes.textField}
                                        value={this.state.email}
                                        onChange={this.handleChange("email")}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="clave"
                                        label="Contraseña"
                                        type="password"
                                        className={classes.textField}
                                        value={this.state.pass}
                                        onChange={this.handleChange("pass")}
                                        margin="normal"
                                    />
                                </Grid>
                            </form>
                            <Grid item xs={12}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => this.handleClick()}
                                        disabled={!this.state.email || !this.state.pass }
                                        className={classes.button}
                                    >
                                        Ingresar
                                    </Button>
                                </div>
                                <Divider className={classes.divider}/>
                                <div>
                                    <Button
                                        onClick={() => this.handleRecoverPass()}
                                        disabled={!this.state.email}
                                        className={classes.btnReestablecer}
                                    >
                                        Restablecer contraseña
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                                {this.state.mensaje &&
                                <Typography variant={"body1"} className={classes.mensaje}>{'*'+this.state.mensaje}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        );
    }
}
let previo = withRouter(LoginPDN);
export default withStyles(styles)(previo);