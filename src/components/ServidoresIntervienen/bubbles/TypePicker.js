import React from 'react'
import PropTypes from 'prop-types';
import './TypePicker.css'
import Button from "@material-ui/core/Button";

export default class TypePicker extends React.Component {
    onBtnClick = (event) => {
        this.props.onChanged(event.target.name)
    }
    render() {
        const { active } = this.props
        return (
            <div className="GroupingPicker">
                <button className={`button ${active === 'sanciones' && 'active'}`} name="sanciones" onClick={this.onBtnClick}>Total sanciones</button>
                <button className={`button ${active === 'monto' && 'active'}`} name="monto" onClick={this.onBtnClick}>Total monto</button>
            </div>
        )
    }
}

TypePicker.propTypes = {
    onChanged: PropTypes.func.isRequired,
    active: PropTypes.oneOf(['sanciones', 'monto']).isRequired,
}
