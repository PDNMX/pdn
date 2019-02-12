import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    text: {
        color: theme.palette.primary.dark,
    },
    formControl: {
        width: '100%'
    },
    mensajeError: {
        color: 'red'
    },
});

class FormularioEndpoint extends React.Component {
    state = {
        endpoint: {
            url: '',
            metodo: '',
            sistema: '',
            descripcion: ''
        },
        mensajeError: ''
    };

    handleChange = name => event => {
        this.setState({
            endpoint: {
                ...this.state.endpoint,
                [name]: event ? (event.target ? event.target.value : event.value) : ''
            }
        })
    };
    handleClick = () => {
        let item = this.state.endpoint;
        if (item.URL && item.metodo && item.sistema && item.descripcion ){
            this.props.addRegistro(this.state.registro);
            this.setState({
                endpoint: {},
                mensaje: ''
            })
        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos'
            })
        }
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.text}>
                            Datos endpoint
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className={classes.formControl} required={true}
                                   id={'url'}
                                   label={'URL'} value={this.state.endpoint.url}
                                   onChange={this.handleChange('url')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Método</InputLabel>
                            <Select
                                value={this.state.endpoint.metodo}
                                onChange={this.handleChange('metodo')}
                            >
                                <MenuItem value={'POST'}>POST</MenuItem>
                                <MenuItem value={'GET'}>GET</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Sistema</InputLabel>
                            <Select
                                value={this.state.endpoint.sistema}
                                onChange={this.handleChange('sistema')}
                            >
                                <MenuItem value={'S1'}>Declaraciones</MenuItem>
                                <MenuItem value={'S2'}>Servidores públicos en contrataciones públicas</MenuItem>
                                <MenuItem value={'S3'}>Sancionados</MenuItem>
                                <MenuItem value={'S4'}>Fiscalización</MenuItem>
                                <MenuItem value={'S5'}>Denuncias</MenuItem>
                                <MenuItem value={'S6'}>Contrataciones</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className={classes.formControl} required={true}
                                   id={'descripcion'}
                                   label={'Descripcion'} value={this.state.endpoint.descripcion}
                                   onChange={this.handleChange('descripcion')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body1"} className={classes.mensajeError}>{this.state.mensaje}</Typography>
                    </Grid>
                    <Grid item xs={11}/>
                    <Grid item xs={1}>
                        <Tooltip title={'Agregar'}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={() => this.handleClick()}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(FormularioEndpoint);