import React from 'react'
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme =>({
    formControl: {
        margin: theme.spacing.unit,
            minWidth: 120,
    },
});

class ControlSelect extends React.Component {
    state={
      tipo_grafica:1,
        agrupacion:0

    };
    onChangeG = (event) => {
        console.log("EVEnt: ",event);
        this.props.onChangeGraphic(event.target.value)
    };
    onChangeGroup = event => {
        this.props.onChangeGroup(event.target.value)
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={"grafica"}>{'Gráfica'}</InputLabel>
                            <Select
                                onChange={this.onChangeG}
                                inputProps={{
                                    id:'grafica'
                                }}
                                value={this.state.tipo_grafica}
                            >
                                <MenuItem value={1} name={'Servidores públicos sancionados'}>{'Servidores públicos sancionados'}</MenuItem>
                                <MenuItem value={2} name={'Particulares sancionados'}>{'Particulares sancionados'}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={"agrupacion"}>{'Agrupación'}</InputLabel>
                            <Select
                                onChange={this.onChangeGroup}
                                inputProps={{
                                    id:'agrupacion'
                                }}
                                value={this.state.agrupacion}
                            >

                                <MenuItem value={0}>{'Ninguna'}</MenuItem>
                                {this.state.tipo_grafica === 1 &&
                                    <MenuItem value={1}>{'Causa'}</MenuItem>
                                }
                                {this.state.tipo_grafica === 2 &&
                                <MenuItem value={1}>{'Sentido de resolución'}</MenuItem>
                                }

                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

ControlSelect.propTypes = {
    onChangeGroup: PropTypes.func.isRequired,
    onChangeGraphic: PropTypes.func.isRequired

};

export default withStyles(styles)(ControlSelect);