import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {}
});

class Footer extends React.Component {

    render(){

        const { classes } = this.props;

        return (
            <footer className='footer'>
                <div className='container'>
                    <p className='center'>
                        <span style={{color: 'white', fontSize: '2em'}}>
                            gob.mx
                        </span>
                    </p>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
