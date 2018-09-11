import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlusIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/es/styles/withStyles";


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
    },
    divCont:{
        width: '100%',
        padding: theme.spacing.unit * 2
    }
});

class FieldsAcusado extends React.Component {
    state = {
        acusado: {
            id: 2,
            nombre: '',
            descripcionFisica: ''
        }
    };

    handleChange = name => event => {
        this.setState({
            acusado: {
                ...this.state.acusado,
                [name]: event.target.value
            }
        })
    };

    fireAction = () => {
        this.props.addAcusado(this.state.acusado);

        this.setState({
            acusado: {
                nombre: '',
                descripcionFisica: ''
            }
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.divCont}>
                <Grid container spacing={24}>
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            id="nombre"
                            label="Nombre del servidor público o particular"
                            value={this.state.acusado.nombre}
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('nombre')}
                        />
                    </Grid>
                    <Grid item lg={5} md={5} sm={12}>
                        <TextField id="descripcionFisica" label="Descripción física: " className={classes.textField}
                                   value={this.state.acusado.descripcionFisica}
                                   margin="normal"
                                   multiline
                                   fullWidth
                                   onChange={this.handleChange('descripcionFisica')}
                        />
                    </Grid>
                    <Grid item lg={1} md={1} sm={12}>
                        <IconButton color="primary" className={classes.button} aria-label="Agregar"
                                    onClick={() => {
                                        this.fireAction()
                                    }
                                    }

                        >
                            <PlusIcon/>
                        </IconButton>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles)(FieldsAcusado);