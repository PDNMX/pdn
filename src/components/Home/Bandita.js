import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal/Modal";
import Participa from "../Participa/Participa";


const styles = theme => ({
    root: {
        //background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        right: '0',
        zIndex: 1,
        //opacity: 0.7,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1) ,
        paddingRight: theme.spacing(1),
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
                    <Button className={classes.comenta} href={process.env.REACT_APP_LINK_GOOGLEFORM} target={"_blank"}>Comenta</Button>
                   {/* <Button variant='contained' className={classes.comenta} onClick={this.handleClickOpen} >Comenta</Button>
                    <Modal className={classes.modalParticipa}
                           aria-labelledby="simple-modal-title"
                           aria-describedby="simple-modal-description"
                           open={this.state.open}
                           onClose={this.handleClose}
                    >
                        <Participa onClose={this.handleClose}/>
                    </Modal>*/}
                </div>


        );
    }
}

Bandita.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bandita);