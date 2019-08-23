import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    boton: {
        background: '#ffe01b',
    }
});

class AlertDialog extends React.Component {
    state = {
        open: true,
    };

    handleClickOpen() {
        this.setState({open: true});
    };


    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        return (

            <div>
                {/*<Button onClick={this.handleClickOpen}>Open alert dialog</Button>*/}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    { /* <DialogTitle id="alert-dialog-title">{"Servidores públicos y particulares sancionados"}</DialogTitle>*/}
                    <div id={"Vc"}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/e9zZE5i8Vt4?autoplay=1"
                                frameBorder="0" title={'Video'}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>
                </Dialog>
            </div>

        );
    }
}


AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlertDialog);