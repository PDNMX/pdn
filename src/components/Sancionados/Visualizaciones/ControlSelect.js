import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    centrado:{
        textAlign : 'center'
    }
});

class ControlSelect extends React.Component {
    state = {
        tipo_grafica: 1,
        agrupacion: false,

    };
    onChangeG = (param) => {
        this.props.onChangeGraphic(param)
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container justify={"center"} >
                    <Grid item md={3} xs={12} className={classes.centrado}>
                        <Button variant={'text'} color={"primary"}  onClick={()=>this.onChangeG(1)}>{'Servidores públicos sancionados'}</Button>
                    </Grid>
                    <Grid item md={3} xs={12}className={classes.centrado}>
                        <Button variant={'text'} color={"primary"} onClick={()=>this.onChangeG(2)}>{'Particulares sancionados'}</Button>
                    </Grid>
                    <Grid item md={3} xs={12} className={classes.centrado}>
                        <Button variant={'text'} color={"primary"} onClick={()=>this.onChangeG("sanciones")}>{'Inhabilitaciones'}</Button>
                    </Grid>
                    <Grid item md={3} xs={12} className={classes.centrado}>
                        <Button variant={'text'} color={"primary"} onClick={()=>this.onChangeG("monto")}>{'Monto inhabilitaciones'}</Button>
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