import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconHelp from '@material-ui/icons/HelpOutline';
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton/IconButton";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import glosario from "../../Utils/glosario.json";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import * as jsPDF from "jspdf";
import logotipoSESNA from "../../../assets/img/Logo-SESNA.9b04be52.png";

function getGlosarioItem(id){
    return glosario.servidoresSancionados[id];
}

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,

    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 110,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 130,
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',

    },
    fontSmall: {
        fontSize: '.8em',
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        float: 'right'
    },
    title: {
        color: theme.palette.primary.main,
    },
    paperGlosario: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 80,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 130,
        },
    },
        smallIcon: {
        color: theme.palette.primary.main
    },
    centrado:{
        display: 'flex',
        justifyContent : 'center',
        alignItems: 'center'
    }

});

class DetalleServidorSancionado extends React.Component {
    state = {
        open: false,
        id : 0,

    };

    openPoper = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    controlGlosario = (id) => {
        this.setState({id : id});
    };
    getX(doc, texto){
        let fontSize = doc.internal.getFontSize();
        let pageWidth = doc.internal.pageSize.getWidth();
        let aux = '';
        for(var i = 0; i < texto.length ; i++){
            aux += 'a';
        }
        let txtWidth =  doc.getStringUnitWidth(aux) * fontSize / doc.internal.scaleFactor;
        let  x = (pageWidth - txtWidth) / 2;
        return x;
    }

    printPDF(){
        let doc = new jsPDF({
            format : 'letter',
            unit : 'pt'
        });
        let d = this.props.denuncia;
        doc.setFontSize(12);
        doc.setFontType('bold');
        doc.addImage(logotipoSESNA,'PNG',30,20,150,70);
        doc.text('SECRETARÍA EJECUTIVA DEL SISTEMA NACIONAL ANTICORRUPCIÓN',350,60,{maxWidth:250, align : 'justify'});
        doc.text('DOCUMENTO DE PRUEBA',doc.internal.pageSize.getWidth()/2,150,null,null,'center');


        doc.setFontType('normal');
        //doc.text('En la versión oficial podrás consultar las constancias de inhabilitación de servidores públicos y particulares sancionados ' ,30,255);
        let y = 255;
        let text = 'En la versión oficial podrás consultar las constancias de inhabilitación de servidores públicos y particulares sancionados.';
        let lengthOfPage = 440;

        let splitHecho = doc.splitTextToSize(text,lengthOfPage);
        for(var c = 0, stlength = splitHecho.length ; c <stlength; c++){
            doc.text(splitHecho[c], 30,y);
            y+=15;
        }

        y = 400;
        text = 'Saludos del equipo de Plataforma Digital Nacional.';
        splitHecho = doc.splitTextToSize(text,lengthOfPage);
        for(var c = 0, stlength = splitHecho.length ; c <stlength; c++){
            doc.text(splitHecho[c], 30,y);
            y+=15;
        }


        doc.setFontSize(8);
        let t = 'Avenida Coyoacán No. 1501, Col del Valle Centro, Del. Benito Juárez, C.P.03300, Ciudad de México.';
        doc.text(t,this.getX(doc, t),730);
        t = 'Teléfono: 5200-1500, ext. 00000';
        doc.text(t,this.getX(doc, t),740);
        doc.save('test.pdf');
    }
    render() {
        const {classes, handleClose, servidor, control} = this.props;
        const {open,id} = this.state;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}>
                    <div style={getModalStyle()} className={classes.paperGlosario}>
                        <DialogTitle>{getGlosarioItem(id).title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText component={'span'}>
                                <pre><Typography variant={"body1"}>{getGlosarioItem(id).description}</Typography></pre>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.openPoper} color="primary">
                                Cerrar
                            </Button>
                        </DialogActions>

                    </div>

                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={control}
                    onClose={handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>

                        <Grid container spacing={8} justify="flex-start">
                            <Grid item xs={11}>
                                <Typography variant="title" className={classes.title}>Ficha del servidor público sancionado</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" className={classes.button} component="span" onClick={handleClose}>
                                    <CloseButton/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Institución"
                                    defaultValue={servidor.institucion}
                                    className={classes.textField}
                                    margin="normal"
                                    multiline={true}
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position={'end'} onClick={()=>{this.openPoper(); this.controlGlosario(0)}}>
                                                <IconHelp/>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Servidor público"
                                    defaultValue={servidor.servidor}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="start" onClick={()=>{this.openPoper(); this.controlGlosario(1)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>


                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Autoridad"
                                    defaultValue={servidor.autoridad}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(2)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Expediente"
                                    defaultValue={servidor.expediente}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(3)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Fecha resolución"
                                    defaultValue={servidor.fecha_resolucion}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(4)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Sanción impuesta"
                                    defaultValue={servidor.sancion_impuesta}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(5)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Fecha inicio"
                                    defaultValue={servidor.fecha_inicio}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(6)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Fecha fin"
                                    defaultValue={servidor.fecha_fin}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(7)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Monto"
                                    defaultValue={servidor.monto}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(8)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Causa"
                                    defaultValue={servidor.causa}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(9)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12} className={classes.centrado}>
                                <Button color="primary" variant="text" size="small" onClick={()=>this.printPDF()}>
                                    <DownloadIcon />
                                    {'Descargar constancia'}
                                </Button>
                            </Grid>

                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

DetalleServidorSancionado.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(DetalleServidorSancionado);
