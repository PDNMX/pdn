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
/* import { ResultadosPersonasServidorasPublicasParticipanEnContrataciones } from "./ResultadosBusqueda/PersonasServidorasPublicasParticipanEnContrataciones";
import { ResultadosEmpresasSancionadaPorCorrupcion } from "./ResultadosBusqueda/EmpresasSancionadaPorCorrupcion";
import { ResultadosPersonasServidorasPublicasYSusDeclaraciones } from "./ResultadosBusqueda/PersonasServidorasPublicasYSusDeclaraciones";
import { ResultadosEmpresasTienenContratosGob } from "./ResultadosBusqueda/EmpresasTienenContratosGob";
import { ResultadosInstitucionesRealizaronContrataciones } from "./ResultadosBusqueda/InstitucionesRealizaronContrataciones"; */

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
  let titulo = props.tituloBusqueda;
  console.log(titulo);
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

const LinaerStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      tituloModal: "",
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
  const [tituloModal, setTituloModal] = useState('Asistente de búsqueda');
  const steps = getSteps();

  function GetStepContent(step) {
    switch (step) {
      case 0:
        return <TipoBusqueda />;
      case 1:
        return <FiltrosBusqueda tipoBusqueda={name} tituloBusqueda={tituloModal}  />;
      default:
        return "desconocido";
    }
  }

  function ResultadosBusqueda() {
    //const dataForm = JSON.stringify(methods.getValues());
    const tipoBusqueda = methods.getValues().tipoBusqueda;
    return (<>
      <ResultadosPersonasServidorasPublicasSancionados data={tipoBusqueda}/>
    </>)
    /* switch (step) {
      case 0:
        return <TipoBusqueda />;
      case 1:
        return <FiltrosBusqueda tipoBusqueda={name} tituloBusqueda={tituloModal}  />;
      default:
        return "desconocido";
    } */
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
                    setTituloModal(opcion.label);
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

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
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
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep >= steps.length - 1 ? (
        <div>
          <Typography variant="h3" align="center">
            Buscando... 
          </Typography>
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
