import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatosSolicitante from './DatosSolicitante';
import DatosDenuncia from './DatosDenuncia';
import AvisoPrivacidad from './AvisoPrivacidad';

let datosSolicitante = <DatosSolicitante/>;
let datosDenuncia = <DatosDenuncia/>;
let avisoPrivacidad = <AvisoPrivacidad/>
const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
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
    };

    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
    }

    getFolio(){
        return Math.floor(Math.random() * 1000) + 1;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper nonLinear activeStep={activeStep}>
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
                            <Typography className={classes.instructions}>
                                Folio denuncia:{this.getFolio()} , ¿Desea enviar nueva denuncia?
                            </Typography>
                            <Button onClick={this.handleReset}>Nueva</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    Siguiente
                                </Button>
                                {activeStep !== steps.length &&
                                (this.state.completed[this.state.activeStep] ? (
                                    <Typography variant="caption" className={classes.completed}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                        {this.completedSteps() === this.totalSteps() - 1 ? 'Enviar' : 'Terminar'}
                                    </Button>
                                ))}
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

export default withStyles(styles)(HorizontalNonLinearStepper);