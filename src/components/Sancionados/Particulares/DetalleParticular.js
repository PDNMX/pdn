import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconHelp from '@material-ui/icons/HelpOutline';
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton/IconButton";
import glosario from "../../Utils/glosario.json";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import * as jsPDF from "jspdf";

let aux = new Image();
aux.src = "/LogoSesna.png";

function getGlosarioItem(id){
    return glosario.particulares[id];
}

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxHeight: `calc(100vh - 225px)`,
        overflowY: "auto"

    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        [theme.breakpoints.up('sm')]:{
            width: theme.spacing(110),
        },
        [theme.breakpoints.down('sm')]:{
            width: '80%',
            height: '80%',
            overflowY: 'scroll',

        },
        [theme.breakpoints.up('xl')]:{
            width: theme.spacing(130),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',

    },
    fontSmall:{
        fontSize:'.8em',
    },
    flex: {
        flexGrow: 1,
    },
    button:{
        float:'right'
    },
    title:{
        color : theme.palette.primary.main,

    },
    paperGlosario: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(80),
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(130),
        },
    },
    centrado:{
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center'
},
    downloadButton: {
        background : '#FFE01B'
    }
});

class DetalleParticular extends React.Component {
    state ={
        open : false,
        id : 0
    };

    openPoper = () => {
        this.setState(state => ({
            open : !state.open
        }))
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
        doc.setFontSize(12);
        doc.setFontType('bold');
        doc.addImage(aux,'PNG',30,20,150,70);
        doc.text('SECRETARÍA EJECUTIVA DEL SISTEMA NACIONAL ANTICORRUPCIÓN',350,60,{maxWidth:250, align : 'justify'});
        doc.text('DOCUMENTO DE PRUEBA',doc.internal.pageSize.getWidth()/2,150,null,null,'center');


        doc.setFontType('normal');
        //doc.text('En la versión oficial podrás consultar las constancias de inhabilitación de servidores públicos y particulares sancionados ' ,30,255);
        let y = 255;
        let text = 'En la versión oficial podrás consultar las constancias de inhabilitación de servidores públicos y particulares sancionados.';
        let lengthOfPage = 440;

        let splitHecho = doc.splitTextToSize(text,lengthOfPage);
        for(let c = 0, stlength = splitHecho.length ; c <stlength; c++){
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
        const {classes, handleClose, particular, control} = this.props;
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
                            <DialogContentText>
                                {getGlosarioItem(id).description}
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
                        <form>
                            <Grid container spacing={1} justify="flex-start">
                                <Grid item xs={11}>
                                    <Typography variant= "h6" className={classes.title}>Ficha del particular sancionado</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton color="primary" className={classes.button} component="span" onClick={handleClose}>
                                        <CloseButton />
                                    </IconButton>
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Expediente"
                                        defaultValue={particular.numero_expediente}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(8)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Nombre/Razón social"
                                        defaultValue={particular.nombre_razon_social}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(9)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Institución"
                                        defaultValue={particular.institucion_dependencia ? particular.institucion_dependencia.nombre + '('+particular.institucion_dependencia.siglas+')' : particular.institucion_dependencia}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(10)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Autoridad sancionadora"
                                        defaultValue={particular.autoridad_sancionadora}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(11)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Responsable de la información"
                                        defaultValue={particular.responsable}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(6)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>


                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Tipo falta"
                                        defaultValue={particular.tipo_falta}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline={true}
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(12)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Tipo sanción"
                                        defaultValue={particular.tipo_sancion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(13)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Sentido resolución"
                                        defaultValue={particular.resolucion ? particular.resolucion.sentido : particular.resolucion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(14)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Fecha captura"
                                        defaultValue={particular.fecha_captura}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(3)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Fecha notificación"
                                        defaultValue={particular.fecha_notificacion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        multiline={true}
                                        id="read-only-input"
                                        label="Plazo"
                                        defaultValue={particular.plazo}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        multiline={true}
                                        id="read-only-input"
                                        label="Monto"
                                        defaultValue={particular.multa ? particular.multa.monto + ' '+particular.multa.moneda : particular.multa}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(5)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Objeto social"
                                        defaultValue={particular.objetoSocial}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline={true}
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(1)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        id="read-only-input"
                                        label="Hechos"
                                        defaultValue={particular.causa_motivo_hechos}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline={true}
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(0)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline={true}
                                        id="read-only-input"
                                        label="Observaciones"
                                        defaultValue={particular.observaciones}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(15)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                {
                                    /*
                                     <Grid item md={6} xs={12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Fecha de última actualización"
                                        defaultValue={particular.fecha_captura}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(7)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                     */
                                }

                                <Grid item md={6} xs={12} className={classes.centrado}></Grid>
                                <Grid item md={6} xs={12} className={classes.centrado}>
                                    <Button variant="contained"
                                            className={classes.downloadButton}
                                            onClick={()=>this.printPDF()}>
                                        <DownloadIcon className={classes.downloadIcon}/>
                                        {'Descargar constancia'}
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>


                    </div>
                </Modal>
            </div>
        );
    }
}

DetalleParticular.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(DetalleParticular);
