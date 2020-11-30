import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
//import Modal from "@material-ui/core/Modal/Modal";
//import Participa from "../Participa/Participa";
import Glosario from "../Glosario/";
import ScrollToTopButton from "../Navigation/ScrollToTopButton";


const styles = theme => ({
    root: {
        //background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        right: '0',
        zIndex: 1,
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
        margin: theme.spacing(1),
        background: '#ffe01b'
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
                    <ScrollToTopButton/>
                    <div>
                        <Glosario />
                    </div>
                    <div>
                        <Button variant='contained' className={classes.comenta} href={process.env.REACT_APP_LINK_GOOGLEFORM} target={"_blank"}>Comenta</Button>
                    </div>
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
