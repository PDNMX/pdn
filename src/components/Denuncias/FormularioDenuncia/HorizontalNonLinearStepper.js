import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core"
import DatosSolicitante from './DatosSolicitante';
import DatosDenuncia from './DatosDenuncia';
import AvisoPrivacidad from './AvisoPrivacidad';
import * as jsPDF from 'jspdf';
import logotipoSESNA from '../../../assets/img/LogotipoSESNA-01.png';
import rp from 'request-promise';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';
import CircularProgress from '@material-ui/core/CircularProgress';

let datosSolicitante = <DatosSolicitante/>;
let datosDenuncia = <DatosDenuncia/>;


let avisoPrivacidad = <AvisoPrivacidad/>;

const styles = theme => ({
    root: {
        width: '300%',
    },
    button: {
        margin: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    progress: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});

function getSteps() {
    return ['Datos solicitante', 'Datos de la denuncia', 'Aviso de privacidad'];
}


function getStepContent(step) {
    switch (step) {
        case 0:
            return datosSolicitante;
        case 1:
            return datosDenuncia;
        case 2:
            return avisoPrivacidad;
        default:
            return 'Unknown step';
    }
}

let loading = false;
class HorizontalNonLinearStepper extends React.Component {
    state = {
        activeStep: 0,
        completed: {},

    };

    totalSteps = () => {
        return getSteps().length;
    };

    handleNext = () => {
        let activeStep;
        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed,
        });
        this.handleNext();
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: {},
        });
        this.props.newDenuncia();
    };

    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    };

     saveDenuncia = () =>{
         let denuncia = this.props.denuncia;
         denuncia.hora_hecho = null;
         denuncia.folio = uuidv1();
         denuncia.edad_solicitante = denuncia.edad_solicitante? denuncia.edad_solicitante : 0;

         let options = {
             method : 'POST',
             uri : 'https://plataformadigitalnacional.org/api/denuncias',
             headers:{
                 'Prefer' : 'return = representation',
                 'Content-Type' : 'application/json'
             },
             body : denuncia,
             json:true
         };

         rp(options)
             .then(parseBody => {
                 this.printPDF();
             })
             .catch(err => {
                 alert("_No se pudo completar la operación");
                 console.log(err);
             });

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
        doc.addImage(logotipoSESNA,'PNG',30,-20,200,180);
        doc.text('SECRETARÍA EJECUTIVA DEL SISTEMA NACIONAL ANTICORRUPCIÓN',350,60,{maxWidth:250, align : 'justify'});
        doc.text('ACUSE DE QUEJA O DENUNCIA',doc.internal.pageSize.getWidth()/2,150,null,null,'center');

        doc.setFontType('normal');
        doc.text('Fecha de la denuncia: '+(new Date().toLocaleDateString()),30,190);
        doc.text('Folio de denuncia: '+d.folio,30,205);


        doc.setFontSize(11);
        doc.setFontType('bold');
        doc.text('DATOS DEL SOLICITANTE',30,240);

        doc.setFontType('normal');
        doc.text('Nombre: ' + d.nombre_solicitante + ' ' + d.apellido_uno_solicitante + ' ' + d.apellido_dos_solicitante ,30,255);
        doc.text('Teléfono: ' + d.telefono_solicitante, 30,270);
        doc.text('Correo electrónico: ' + d.correo_solicitante,30,285);


        doc.setFontType('bold');
        doc.text('DATOS DE LA DENUNCIA',30,340);

        doc.setFontType('normal');
        doc.text('Fecha y hora del hecho: ' + d.fecha_hecho.toLocaleDateString() ,30,355);
        doc.text('Institución: ' + d.institucion_servidor ,30,370);
        doc.text('Motivo de la denuncia: ' + d.motivo_denuncia,30,385);
        doc.text('Servidor público o particular: ' + d.institucion_servidor ,30,400);
        doc.text('Hechos: '  ,30,415);
        let y = 430;
        let text = d.motivo_peticion;
        let lengthOfPage = 440;

        let splitHecho = doc.splitTextToSize(text,lengthOfPage);
       for(var c = 0, stlength = splitHecho.length ; c <stlength; c++){
            doc.text(splitHecho[c], 30,y);
            y+=15;
        }

        doc.setFontSize(8);
        let t = 'Avenida Coyoacán No. 1501, Col del Valle Centro, Del. Benito Juárez, C.P.03300, Ciudad de México.';
        doc.text(t,this.getX(doc, t),730);
        t = 'Teléfono: 5200-1500, ext. 00000';
        doc.text(t,this.getX(doc, t),740);
        doc.save('Acuse.pdf');
    }

    allStepsCompleted() {
        return (this.completedSteps() === this.totalSteps());
    }

    getFolio(){
        return Math.floor(Math.random() * 3000) + 1;
    }

    render() {
        const { classes, denuncia } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (

            <div className={classes.root}>
                {
                    loading &&
                    <CircularProgress className={classes.progress} id="spinnerLoading" size={100}/>
                }
                <Stepper nonLinear activeStep={activeStep} aria-describedby="spinnerLoading"
                         aria-busy={this.state.loading}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.state.completed[index]}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                        <div>
                            {this.saveDenuncia()}

                            <Typography className={classes.instructions}>
                                Folio denuncia :{denuncia.folio} , ¿Desea enviar nueva denuncia?
                            </Typography>
                            <Button onClick={this.handleReset}>Nueva</Button>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleComplete}
                                    className={classes.button}
                                >
                                    {this.completedSteps() === this.totalSteps() - 1 ? 'Enviar' : 'Siguiente'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

HorizontalNonLinearStepper.propTypes = {
    classes: PropTypes.object,
};


const mapDispatchToProps = (dispatch, ownProps) => ({
    newDenuncia : () => dispatch({type : 'NEW_DENUNCIA'}),
});

const mapStateToProps = (state, ownProps) => {
    let newState = {
        denuncia : state.denunciaReducer.denuncia
    };
    return newState;
};

let previo = withStyles(styles)(HorizontalNonLinearStepper);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(previo)