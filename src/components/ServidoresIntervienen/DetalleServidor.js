import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconHelp from '@material-ui/icons/HelpOutline';
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import glosario from "../Utils/glosario.json";
//import DownloadIcon from "@material-ui/icons/CloudDownload";
import * as jsPDF from "jspdf";

let aux = new Image();
aux.src = "/LogoSesna.png";

function getGlosarioItem(id){
    return glosario.servidores[id];
}

function getModalStyle() {
    const top = 50;
    const left = 50;
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
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(110),
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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
    smallIcon: {
        color: theme.palette.primary.main
    },
    downloadIcon: {
        paddingRight: theme.spacing(1)
    },
    downloadButton: {
        background : '#FFE01B'
    },
    test:{

    }

});

class DetalleServidor extends React.Component {
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
        return (pageWidth - txtWidth) / 2;
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

                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={11}>
                                <Typography variant="h6" className={classes.title}>Ficha del servidor
                                    público </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" className={classes.button} component="span"
                                            onClick={handleClose}>
                                    <CloseButton/>
                                </IconButton>
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
                                            <InputAdornment position="start" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(1)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Puesto"
                                    defaultValue={servidor.puesto ? servidor.puesto.nombre : servidor.puesto}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(2)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}

                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Institución"
                                    defaultValue={servidor.institucion ? servidor.institucion.nombre + " (" + servidor.institucion.siglas + ")" : servidor.institucion}
                                    className={classes.textField}
                                    margin="normal"
                                    multiline={true}
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position={'end'} onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(0)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Ramo"
                                    defaultValue={servidor.ramo ? servidor.ramo.ramo : servidor.ramo}
                                    className={classes.textField}
                                    margin="normal"
                                    multiline={true}
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position={'end'} onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(8)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Periodo ejercicio"
                                    defaultValue={servidor.periodo_ejercicio ? servidor.periodo_ejercicio.fecha_inicial + " - " + servidor.periodo_ejercicio.fecha_final : servidor.periodo_ejercicio}
                                    className={classes.textField}
                                    margin="normal"
                                    multiline={true}
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position={'end'} onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(9)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Tipo de área"
                                    defaultValue={Array.isArray(servidor.tipoArea)
                                        ? servidor.tipoArea.map(item => {
                                            return item + " "
                                        }) : servidor.tipoArea}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(3)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Contrataciones públicas"
                                    defaultValue={servidor.contrataciones}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(4)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Enajenacion de bienes muebles"
                                    defaultValue={servidor.enajenacion}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(5)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Concesiones, licencias, premios, autorizaciones y prórrogas"
                                    defaultValue={servidor.concesionesLicencias}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(6)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                    InputLabelProps={{
                                        className: classes.test
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Asignación y emisión de dictámenes de avalúos nacionales"
                                    defaultValue={servidor.dictamenes}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={() => {
                                                this.openPoper();
                                                this.controlGlosario(7)
                                            }}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}></Grid>

                        </Grid>

                    </div>
                </Modal>
            </div>
        );
    }
}

DetalleServidor.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(DetalleServidor);
