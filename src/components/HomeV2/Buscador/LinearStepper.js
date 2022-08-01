import React, { useState, useEffect } from "react";
import { Typography, Step, Button, Stepper, StepLabel } from "@mui/material/";
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
import { ResultadosS3s } from "./ResultadosBusqueda/s3/PersonasServidorasPublicasSancionados";
import { ResultadosS2 } from "./ResultadosBusqueda/s2/PersonasServidorasPublicasParticipanEnContrataciones";
import { ResultadosS3p } from "./ResultadosBusqueda/s3/EmpresasSancionadaPorCorrupcion";
import { ResultadosS1 } from "./ResultadosBusqueda/s1/PersonasServidorasPublicasYSusDeclaraciones";
import { ResultadosS6v1 } from "./ResultadosBusqueda/s6/EmpresasTienenContratosGob";
import { ResultadosS6v2 } from "./ResultadosBusqueda/s6/InstitucionesRealizaronContrataciones";

import PropTypes from 'prop-types'; 
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "3% 0%",
    width: "100%"
    /* backgroundColor: 'rgba(29, 80, 109, 0.95)', */
  },
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
  cardMedia: {           
    height: "100%",    
    width: '30%',
    margin: '3% 0%',
    objectFit: "cover",
  },
  card: {
    /* background: "#fff", */
    /* width: "24em", */
    borderRadius: "0.6em",
    margin: '2%',
    overflow: "hidden",
    /* cursor: "pointer", */
    boxShadow: "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
    transition: "all ease 200ms",     
    height: '100%',    
    '&:hover': {
      transform: "scale(1.03)",
      boxShadow: "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
    },
  },
  Tooltip:{
    maxWidth:250,
    backgroundColor: "rgba(38, 37, 37)",
    fontSize: 15,
    color:"white",
  }
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
      "psp-sancionados": { "nombres": "", "primerApellido": "", "segundoApellido": "", "institucion": "", "tipoSancion": []},
      "psp-participan": { "nombres": "", "primerApellido": "", "segundoApellido": "", "institucion": "", "tipoProcedimientoContratacion": [] },
      "psp-declaraciones": { "nombres": "", "primerApellido": "", "segundoApellido": "", "institucion": "", "empleoCargoComision": "" },
      "empresas-sancionadas": { "nombreRazonSocial": "", "institucion": "", "tipoSancion": []},
      "empresas-contratos": { "nombreRazonSocial":"", "bienServicioOtorgado":""},
      "instituciones-contrataciones": { "institucionContratante":"", "bienServicioOtorgado":"", "tipoContratacion":"any"}
    },
  });
  /* const methods = useForm(); */
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [name, setName] = useState('');
  const steps = getSteps();

  function GetStepContent(step) {
    switch (step) {
      case 0:
        return <TipoBusqueda />;
      case 1:
        return <FiltrosBusqueda tipoBusqueda={name}/>;
      default:
        return "desconocido";
    }
  }

  function ResultadosBusqueda() {
    const parametrosBusqueda = JSON.stringify(methods.getValues());
    //console.log(parametrosBusqueda)
    //let tipoBusqueda = methods.getValues().tipoBusqueda;
    let tipoBusqueda = name;
    switch (tipoBusqueda) {
      case 'psp-sancionados':
        return <ResultadosS3s data={parametrosBusqueda}/>;
      case 'psp-participan':
        return <ResultadosS2 data={parametrosBusqueda}/>;
      case 'psp-declaraciones':
        return <ResultadosS1 data={parametrosBusqueda}/>;
      case 'empresas-sancionadas':
        return <ResultadosS3p data={parametrosBusqueda}/>;
      case 'empresas-contratos':
        return <ResultadosS6v1 data={parametrosBusqueda}/>
      case 'instituciones-contrataciones':
        return <ResultadosS6v2 data={parametrosBusqueda}/>;
      default:
        return <p>Debes de seleccionar una opción de búsqueda</p>;
    }
  }

  function TipoBusqueda() {
    const opciones = [
      { label: "Personas servidoras públicas sancionadas", value: "psp-sancionados", sistema: "s3sp", detalle: "Información de personas servidoras públicas por la comisión de faltas administrativas.", img: "ico_Spsancionados.svg" },
      { label: "Personas servidoras públicas que participan en contrataciones", value: "psp-participan", sistema: "s2", detalle: "Datos de personas servidoras públicas que intervienen en contrataciones públicas, otorgamiento de concesiones, enajenaciones de bienes y emisión de dictámenes.", img: "ico_Spcontrataciones.svg" },
      { label: "Personas servidoras públicas y sus declaraciones patrimoniales", value: "psp-declaraciones", sistema: "s1", detalle: "Declaraciones patrimoniales de personas servidoras públicas de todo el país.", img: "ico_Spdeclaraciones.svg" },
      { label: "Empresas sancionadas por actos corrupción", value: "empresas-sancionadas", sistema: "s3p", detalle: "Información de particulares sancionados por la comisión de faltas administrativas.", img: "ico_empresas_sancionadas.svg"},
      { label: "Empresas que tiene contratos con el gobierno", value: "empresas-contratos", sistema: "s6", detalle: "Información de particulares que otorgan bienes, servicios u obra pública a las instituciones públicas de todo el país.", img: "ico_empresas_contratos_gob.svg"},
      { label: "Instituciones que realizaron contrataciones públicas", value: "instituciones-contrataciones", sistema: "s6", detalle: "Información sobre los gastos que realizan las instituciones públicas de todo el país para la adquisición de bienes, servicios u obra pública. ", img: "ico_instituciones_contrataciones.svg"},
    ];
    const { control } = useFormContext();
    return (
        <>
          <Controller
              control={control}
              name="tipoBusqueda"
              render={({ field }) => (
                  <Grid
                      container
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      className={classes.container}
                  >
                    {opciones.map((opcion, index) => (
                        <Grid key={index} item md={4}>
                          <Card
                              className={classes.card}
                              {...field}
                          >
                            <Tooltip title={opcion.detalle} TransitionComponent={Zoom} classes = {{tooltip: classes.Tooltip}} placement="top">
                              <CardActionArea
                                  value={opcion.value}
                                  onClick={(e) => {
                                    setName(opcion.value);
                                    stateChanger(opcion.label);
                                    handleNext();
                                  }}
                                  /* style={{border: "5px solid red" }} */
                              >
                                <CardMedia
                                    className={classes.cardMedia}
                                    component="img"
                                    image= {"./asistente_busqueda/" + opcion.img}
                                    alt="ejemplo"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="subtitle1">
                                    {opcion.label}
                                  </Typography>
                                  {/* <Typography variant="subtitle2" color="text.secondary">
                          {opcion.detalle}
                        </Typography> */}
                                </CardContent>
                              </CardActionArea>
                            </Tooltip>
                          </Card>
                        </Grid>
                    ))}
                  </Grid>
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
    //activeStep == 0 ? stateChanger("Asistente de búsqueda") : stateChanger("Asistente de búsqueda");
  };
  const handleRestart = () => {
    setActiveStep(0);
    //stateChanger("Asistente de búsqueda");
  };

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 90,
    height: 90,
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
      1: <PersonIcon sx={{ fontSize:50 }} />,
      2: <SettingsIcon sx={{ fontSize: 50 }} />,
      3: <MapIcon sx={{ fontSize: 50 }} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
          {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 43,
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
      height: 5,
      border: 0,
      backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  useEffect(() => {
    if (activeStep == 0) {
      stateChanger("Asistente de búsqueda");
    }
    //Runs on every render
  });
  

  return (
      <>
        <p>Este buscador, tiene el objetivo de facilitar la búsqueda de datos anticorrupción en la Plataforma Digital Nacional.</p>
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
              <ResultadosBusqueda className={classes.container}/>
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
              <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(handleNext)} noValidate>
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
                          onClick={() => methods.resetField(name)}
                      >
                        Limpiar
                      </Button>
                  )}
                  <Button
                      className={classes.btnPDN}
                      disabled={activeStep === 0}
                      variant="contained"
                      color="primary"
                      /* disabled={name === ''} */
                      type="submit"
                  >
                    Buscar
                    {/* {activeStep >= 1 ? "Buscar" : "Siguiente"} */}
                  </Button>
                </form>
              </FormProvider>
            </>
        )}
      </>
  );
};

export default LinaerStepper;
