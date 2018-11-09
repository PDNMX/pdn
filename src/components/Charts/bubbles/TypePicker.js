import React from 'react'
import PropTypes from 'prop-types';
import './TypePicker.css';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

export default class TypePicker extends React.Component {
    onBtnClick = (name) => {
        this.props.onChanged(name)
    };

    render() {
        const {} = this.props;
        return (
            <div className="GroupingPicker">

                <Grid container spacing={40} justify={"center"}>
                    <Grid item xs={3}/>
                    <Grid item xs={3}>
                        <Button variant={'text'} color={"primary"}
                                onClick={() => this.onBtnClick("sanciones")}>{'Servidores públicos sancionados'}</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={'text'} color={"primary"}
                                onClick={() => this.onBtnClick("monto")}>{'Particulares sancionados'}</Button>
                    </Grid>
                    <Grid item xs={3}/>

                </Grid>
            </div>
        )
    }
}

TypePicker.propTypes = {
    onChanged: PropTypes.func.isRequired,
    active: PropTypes.oneOf(['sanciones', 'monto']).isRequired,
};
