import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
   button: {
       background: '#ffe01b',
       margin: theme.spacing(1)
   }
});

function ShowcaseButton(props) {
    const {buttonContent, onClick, classes} = props;
    return (
        <Button variant="contained" className={classes.button} onClick={onClick}>
            {buttonContent}
        </Button>
    );
}

ShowcaseButton.propTypes = {
    buttonContent: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ShowcaseButton);