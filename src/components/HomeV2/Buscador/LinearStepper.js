import React, { useState } from "react";
import { Typography, Step, Button, Stepper, StepLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useForm, Controller, FormProvider, useFormContext, } from "react-hook-form";

// INPUTS PARA EL FORM
import { PersonasServidorasPublicasSancionados } from "./InputsBusqueda/PersonasServidorasPublicasSancionados";
import { PersonasServidorasPublicasParticipanEnContrataciones } from "./InputsBusqueda/PersonasServidorasPublicasParticipanEnContrataciones";
import { EmpresasSancionadaPorCorrupcion } from "./InputsBusqueda/EmpresasSancionadaPorCorrupcion";
import { PersonasServidorasPublicasYSusDeclaraciones } from "./InputsBusqueda/PersonasServidorasPublicasYSusDeclaraciones";
import { EmpresasTienenContratosGob } from "./InputsBusqueda/EmpresasTienenContratosGob";
import { InstitucionesRealizaronContrataciones } from "./InputsBusqueda/InstitucionesRealizaronContrataciones";

// RESULTADOS PARA EL FORM
import { ResultadosPersonasServidorasPublicasSancionados } from "./ResultadosBusqueda/PersonasServidorasPublicasSancionados";
import { ResultadosPersonasServidorasPublicasParticipanEnContrataciones } from "./ResultadosBusqueda/PersonasServidorasPublicasParticipanEnContrataciones";
import { ResultadosEmpresasSancionadaPorCorrupcion } from "./ResultadosBusqueda/EmpresasSancionadaPorCorrupcion";
import { ResultadosPersonasServidorasPublicasYSusDeclaraciones } from "./ResultadosBusqueda/PersonasServidorasPublicasYSusDeclaraciones";
import { ResultadosEmpresasTienenContratosGob } from "./ResultadosBusqueda/EmpresasTienenContratosGob";
import { ResultadosInstitucionesRealizaronContrataciones } from "./ResultadosBusqueda/InstitucionesRealizaronContrataciones";

import PropTypes from 'prop-types'; 
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  btnPDN:{
    margin: theme.spacing(1),
    background: "rgb(255,255,255,0.5)",
    borderRadius: "50px",
    fontWeight: "bold",
    fontStyle: "italic",
    '&:hover': {
        backgroundColor: "#56a3bf",
    },
  },
}));

function getSteps() {
  return [
    "Tipo de Búsqueda",
    "Filtros de Búsqueda",
    "Resultados de Búsqueda"
  ];
}

function FiltrosBusqueda(props) {
  let tipoBusqueda = props.tipoBusqueda;
  //console.log(tipoBusqueda);
  switch (tipoBusqueda) {
    case 'psp-sancionados':
      return <PersonasServidorasPublicasSancionados/>;
    case 'psp-participan':
      return <PersonasServidorasPublicasParticipanEnContrataciones/>;
    case 'psp-declaraciones':
        return <PersonasServidorasPublicasYSusDeclaraciones/>;
    case 'empresas-sancionadas':
      return <EmpresasSancionadaPorCorrupcion/>;
    case 'empresas-contratos':
      return <EmpresasTienenContratosGob/>
    case 'instituciones-contrataciones':
      return <InstitucionesRealizaronContrataciones/>;
    default:
      return "desconocido";
  }
}

const LinaerStepper = ({stateChanger, ...rest}) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      tipoBusqueda: "",
      nombres: "",
      primerApellido: "",
      segundoApellido: "",
      institucion: "",
      tipoSancion: "",
      empleoCargoComision: "",
      institucionContratante: "",
      nombreRazonSocial: "",
      bienServicioOtorgado: "",
      tipoProcedimientoContratacion: ""
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [name, setName] = useState('');
  const steps = getSteps();

  function GetStepContent(step) {
    switch (step) {
      case 0:
        return <TipoBusqueda />;
      case 1:
        return <FiltrosBusqueda tipoBusqueda={name} />;
      default:
        return "desconocido";
    }
  }

  function ResultadosBusqueda() {
    const parametrosBusqueda = JSON.stringify(methods.getValues());
    let tipoBusqueda = methods.getValues().tipoBusqueda;
    switch (tipoBusqueda) {
      case 'psp-sancionados':
        return <ResultadosPersonasServidorasPublicasSancionados data={parametrosBusqueda}/>;
      case 'psp-participan':
        return <ResultadosPersonasServidorasPublicasParticipanEnContrataciones data={parametrosBusqueda}/>;
      case 'psp-declaraciones':
          return <ResultadosPersonasServidorasPublicasYSusDeclaraciones data={parametrosBusqueda}/>;
      case 'empresas-sancionadas':
        return <ResultadosEmpresasSancionadaPorCorrupcion data={parametrosBusqueda}/>;
      case 'empresas-contratos':
        return <ResultadosEmpresasTienenContratosGob data={parametrosBusqueda}/>
      case 'instituciones-contrataciones':
        return <ResultadosInstitucionesRealizaronContrataciones data={parametrosBusqueda}/>;
      default:
        return <p>Debes de seleccionar una opción de búsqueda</p>;
    }
  }

  function TipoBusqueda() {
    const opciones = [
    { label: "Personas Servidoras Públicas Sancionadas", value: "psp-sancionados", sistema: "s3sp", detalle: "" },
    { label: "Personas Servidoras Públicas que participan en contrataciones", value: "psp-participan", sistema: "s2", detalle: "" },
    { label: "Personas Servidoras Públicas y sus declaraciones patrimoniales", value: "psp-declaraciones", sistema: "s1", detalle: "" },
    { label: "Empresas sancionadas por actos corrupción", value: "empresas-sancionadas", sistema: "s3p", detalle: ""},
    { label: "Empresas que tiene contratos con el gobierno", value: "empresas-contratos", sistema: "s6", detalle: ""},
    { label: "Instituciones que realizaron contrataciones públicas", value: "instituciones-contrataciones", sistema: "s6", detalle: ""},
  ];
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="tipoBusqueda"
        render={({ field }) => (
          <div><br/>
            <RadioGroup
              aria-labelledby="tipo-busqueda"
              defaultValue=""
              name="tipoBusqueda"
              {...field}
              >
              {opciones.map((opcion, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio />}
                  value={opcion.value}
                  label={opcion.label}
                  checked={name === opcion.value}
                  onChange={(e) =>   {
                    setName(e.target.value);
                    stateChanger(opcion.label);
                    }                   
                  }
                />
                
              ))}
            </RadioGroup>
            <br/>
          </div>
        )}
      />
    </>
  );
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(
      skippedSteps.filter((skipItem) => skipItem !== activeStep)
    );
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleRestart = () => {
    setActiveStep(0);
  };

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage: 'linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
      'linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className} = props;
  
    const icons = {
      1: <PersonIcon />,
      2: <SettingsIcon />,
      3: <MapIcon />,
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
        'linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
        'linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                opcional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep >= steps.length - 1 ? (
        <div>
          {/* <Typography variant="h3" align="center">
            Buscando... 
          </Typography> */}
          <ResultadosBusqueda />
          <Button
            className={classes.btnPDN}
            disabled={activeStep === 0}
            variant="contained"
            /* color="primary" */
            onClick={handleRestart}
          >
            Reiniciar Busqueda
          </Button>
        </div>

      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {GetStepContent(activeStep)}

              <Button
                className={classes.btnPDN}
                disabled={activeStep === 0}
                variant="contained"
                color="primary"
                onClick={handleBack}
              >
                Regresar
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.btnPDN}
                  variant="contained"
                  color="primary"
                >
                  Limpiar
                </Button>
              )}
              <Button
                className={classes.btnPDN}
                variant="contained"
                color="primary"
                disabled={name === ''}
                type="submit"
              >
                {activeStep >= 1 ? "Buscar" : "Siguiente"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
