import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal/Modal";
import Participa from "../Participa/Participa";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

const styles = theme => ({
    root: {
        //background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        right: '0',
        zIndex: 1,
        //opacity: 0.7,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit ,
        paddingRight: theme.spacing.unit,
        textAlign: 'right',
        align: "right"
    },
    item: {
        maxWidth: 1200
    },
    comenta:{
        background: '#ffe01b',
    }
});


class Bandita extends React.Component{
    state = {
        open: false,
       
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render(){

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button variant='contained' className={classes.comenta} onClick={this.handleClickOpen} >Comenta</Button>
                <Modal className={classes.modalParticipa}
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description"
                       open={this.state.open}
                       onClose={this.handleClose}
                >
                        <Participa onClose={this.handleClose}/>
                </Modal>
            </div>
        );
    }
}

Bandita.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bandita);