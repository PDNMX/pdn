import React from 'react'
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const styles = theme =>({
    formControl: {
        margin: theme.spacing.unit,
            minWidth: 120,
    },
});

class ControlSelect extends React.Component {
    state={
      tipo_grafica:1,
      agrupacion:false,

    };
    onChangeG = (event) => {
        this.props.onChangeGraphic(event.target.value)
    };
    onChangeGroup = event => {
        this.setState({
            agrupacion : event.target.checked
        });
        this.props.onChangeGroup(event.target.checked)
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
                    {/*}
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.agrupacion}
                                    onChange={this.onChangeGroup}
                                    value={'agrupacion'}
                                />
                            }
                            label= {this.state.tipo_grafica===1?'Agrupar por causa': 'Agrupar por sentido de resolución'}
                        />
                    </Grid>
*/}
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