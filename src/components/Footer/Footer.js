import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: '#040718',
        height: '70px'
    }
});

class Footer extends React.Component {

    render(){

        const {classes} = this.props;

        return (
            <footer className={classes.root}>
                <div className='container'>

                </div>
            </footer>
        );
    }

}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
