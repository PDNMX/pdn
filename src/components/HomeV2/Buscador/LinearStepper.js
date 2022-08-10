import React, { useState, useEffect } from "react";
import { Typography, Step, Button, Stepper, StepLabel } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

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

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MapIcon from "@mui/icons-material/Map";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const KEY = "pdn.camposBusqueda";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "3% 0%",
    width: "100%",
    /* backgroundColor: 'rgba(29, 80, 109, 0.95)', */
  },
  button: {
    marginRight: theme.spacing(1),
  },
  btnPDN: {
    margin: theme.spacing(1),
    background: "rgb(255,255,255,0.5)",
    borderRadius: "50px",
    fontWeight: "bold",
    fontStyle: "italic",
    "&:hover": {
      backgroundColor: "#56a3bf",
    },
  },
  cardMedia: {
    width: "30%",
    margin: "3% 0%",

  },
  card: {
    background: "#E1E8EB",
    borderRadius: "0.6em",
    margin: "2%",
    boxShadow:
      "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
    transition: "all ease 200ms",
    
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow:
        "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
    },
    
  },
  Tooltip: {
    maxWidth: 250,
    backgroundColor: "rgba(38, 37, 37)",
    fontSize: 15,
    color: "white",
  },
  stepper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  subTitle:{
    fontWeight: 500,
    color: "#E1E8EB",
    "& b": {
        color: "#3bb1e6",
    }
  },
  labelSistema: {
    left: 15,
    top: 15,
    position: 'absolute',
    zIndex: 1,
    fontSize: 11,
    color: "#141414",
    borderRadius: "0.9em",
    cursor: "pointer",
    fontWeight: 450,
  },
  divider: {
    color: "rgb(237 237 237 / 31%)",
    "&:before": {
      borderTop: "thin solid rgb(237 237 237 / 31%)"
    },
    "&:after": {
      borderTop: "thin solid rgb(237 237 237 / 31%)"
    }
  }
}));

function getSteps() {
  return ["Tipo de Búsqueda", "Filtros de Búsqueda", "Resultados de Búsqueda"];
}

function FiltrosBusqueda(props) {
  let tipoBusqueda = props.tipoBusqueda;
  //console.log(tipoBusqueda);
  switch (tipoBusqueda) {
    case "psp-sancionados":
      return <PersonasServidorasPublicasSancionados />;
    case "psp-participan":
      return <PersonasServidorasPublicasParticipanEnContrataciones />;
    case "psp-declaraciones":
      return <PersonasServidorasPublicasYSusDeclaraciones />;
    case "empresas-sancionadas":
      return <EmpresasSancionadaPorCorrupcion />;
    case "empresas-contratos":
      return <EmpresasTienenContratosGob />;
    case "instituciones-contrataciones":
      return <InstitucionesRealizaronContrataciones />;
    default:
      return "desconocido";
  }
}

const LinaerStepper = ({ stateChanger, ...rest }) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      "psp-sancionados": {
        nombres: "",
        primerApellido: "",
        segundoApellido: "",
        institucion: "",
        tipoSancion: [],
      },
      "psp-participan": {
        nombres: "",
        primerApellido: "",
        segundoApellido: "",
        institucion: "",
        tipoProcedimientoContratacion: [],
      },
      "psp-declaraciones": {
        nombres: "",
        primerApellido: "",
        segundoApellido: "",
        institucion: "",
        empleoCargoComision: "",
      },
      "empresas-sancionadas": {
        nombreRazonSocial: "",
        institucion: "",
        tipoSancion: [],
      },
      "empresas-contratos": { nombreRazonSocial: "", bienServicioOtorgado: "" },
      "instituciones-contrataciones": {
        institucionContratante: "",
        bienServicioOtorgado: "",
        tipoContratacion: "any",
      },
    },
  });

  //const { getValues } = useForm();
  /* const methods = useForm(); */
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [name, setName] = useState("");
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
    //console.log(parametrosBusqueda)
    //let tipoBusqueda = methods.getValues().tipoBusqueda;
    localStorage.setItem(KEY, parametrosBusqueda);
    let tipoBusqueda = name;
    switch (tipoBusqueda) {
      case "psp-sancionados":
        return <ResultadosS3s data={parametrosBusqueda} />;
      case "psp-participan":
        return <ResultadosS2 data={parametrosBusqueda} />;
      case "psp-declaraciones":
        return <ResultadosS1 data={parametrosBusqueda} />;
      case "empresas-sancionadas":
        return <ResultadosS3p data={parametrosBusqueda} />;
      case "empresas-contratos":
        return <ResultadosS6v1 data={parametrosBusqueda} />;
      case "instituciones-contrataciones":
        return <ResultadosS6v2 data={parametrosBusqueda} />;
      default:
        return <p>Debes de seleccionar una opción de búsqueda</p>;
    }
  }

  function TipoBusqueda() {
    const opciones = [
      {
        label: "Personas servidoras públicas sancionadas",
        value: "psp-sancionados",
        sistema: "Sistema 3",
        detalle:
          "Información de personas servidoras públicas por la comisión de faltas administrativas.",
        img: "ico_Spsancionados.svg",
        color: "#b8aef9"
      },
      {
        label: "Personas servidoras públicas que participan en contrataciones",
        value: "psp-participan",
        sistema: "Sistema 2",
        detalle:
          "Datos de personas servidoras públicas que intervienen en contrataciones públicas, otorgamiento de concesiones, enajenaciones de bienes y emisión de dictámenes.",
        img: "ico_Spcontrataciones.svg",
        color: "#e7a2e3"
      },
      {
        label: "Personas servidoras públicas y sus declaraciones patrimoniales",
        value: "psp-declaraciones",
        sistema: "Sistema 1",
        detalle:
          "Declaraciones patrimoniales de personas servidoras públicas de todo el país.",
        img: "ico_Spdeclaraciones.svg",
        color: "#f9bfb4"
      },
      {
        label: "Empresas sancionadas por actos corrupción",
        value: "empresas-sancionadas",
        sistema: "Sistema 3",
        detalle:
          "Información de particulares sancionados por la comisión de faltas administrativas.",
        img: "ico_empresas_sancionadas.svg",
        color: "#b8aef9"
      },
      {
        label: "Empresas que tienen contratos con el gobierno",
        value: "empresas-contratos",
        sistema: "Sistema 6",
        detalle:
          "Información de particulares que otorgan bienes, servicios u obra pública a las instituciones públicas de todo el país.",
        img: "ico_empresas_contratos_gob.svg",
        color: "#8dd9f6"
      },
      {
        label: "Instituciones públicas que contrataron bienes, obras o servicios",
        value: "instituciones-contrataciones",
        sistema: "Sistema 6",
        detalle:
          "Información sobre los gastos que realizan las instituciones públicas de todo el país para la adquisición de bienes, servicios u obra pública. ",
        img: "ico_instituciones_contrataciones.svg",
        color: "#8dd9f6"
      },
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
              alignItems="stretch"
              justifyContent="center"
              className={classes.container}
            >
              {opciones.map((opcion, index) => (
                <Grid key={index} item md={4} xs={6} sm={6} style={{display: 'flex'}}>
                  <Card className={classes.card} {...field} style={{width: "100%", display: 'flex', justifyContent: 'space-between', flexDirection: 'column', "borderBottom": "0.3rem solid " + opcion.color}}>
                    <Tooltip
                      title={opcion.detalle}
                      TransitionComponent={Zoom}
                      classes={{ tooltip: classes.Tooltip }}
                      placement="top"
                    >
                      <CardActionArea
                        value={opcion.value}
                        onClick={(e) => {
                          setName(opcion.value);
                          stateChanger(opcion.label);
                          handleNext();
                        }}
                      >
                      <Chip size="small" className={classes.labelSistema} label={opcion.sistema} style={{backgroundColor: opcion.color}}/>
                        <CardMedia
                          className={classes.cardMedia}
                          component="img"
                          image={"./asistente_busqueda/" + opcion.img}
                        />
                        <CardContent>
                          <Typography variant="subtitle2">
                            {opcion.label}
                          </Typography>

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
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleRestart = () => {
    setActiveStep(0);
  };

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(200,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed } = props;

    const icons = {
      1: <PersonIcon/>,
      2: <SettingsIcon/>,
      3: <MapIcon/>,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}  
      >
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
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(232,214,67) 0%, rgb(232,214,67) 50%, rgb(232,214,67) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  useEffect(() => {
    if (activeStep === 0) {
      stateChanger("Asistente de búsqueda");
    }
    //console.log(methods.getValues());
    //Runs on every render
  });

  /* useEffect(() => {
    if (activeStep === 0) {
      stateChanger("Asistente de búsqueda");
    }
  }, []); */
  useEffect(() => {
    const storedCampos = JSON.parse(localStorage.getItem(KEY));
    //const values = methods.getValues();
    if (storedCampos) {
      //setTodos(storedTodos);
      methods.setValue("psp-sancionados", storedCampos["psp-sancionados"]);
      methods.setValue("psp-participan", storedCampos["psp-participan"]);
      methods.setValue("psp-declaraciones", storedCampos["psp-declaraciones"]);
      methods.setValue("empresas-sancionadas", storedCampos["empresas-sancionadas"]);
      methods.setValue("empresas-contratos", storedCampos["empresas-contratos"]);
      methods.setValue("instituciones-contrataciones", storedCampos["instituciones-contrataciones"]);
      //console.log(storedCampos);
    }
  }, [methods]);

  return (
    <>
      <Typography className={classes.subTitle} variant="body1">
        Este <b>buscador</b>, tiene el objetivo de facilitar la búsqueda de datos anticorrupción en la Plataforma Digital Nacional.
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={classes.stepper} 
      >
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block", color: "rgb(232,214,67)" }}
              >
                opcional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step 
              {...stepProps} 
              key={index}
              sx={{
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                  {
                    color: 'grey.500', // Just text label (COMPLETED)
                  },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                  {
                    color: '#3bb1e6', // Just text label (ACTIVE)
                  },
                '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel':
                  {
                    color: '#fff', // Just text label (ACTIVE)
                  },
              }}
            >
              <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps} >
                <Typography
                  variant="caption"
                  align="center"
                >
                  {step}
                </Typography>
                
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </Grid>
      </Grid>
      

      {activeStep >= steps.length - 1 ? (
        <>
          <ResultadosBusqueda className={classes.container} />
          <Button
            className={classes.btnPDN}
            disabled={activeStep === 0}
            variant="contained"
            /* color="primary" */
            onClick={handleRestart}
          >
            Reiniciar Busqueda
          </Button>
        </>
      ) : (
        <><Divider className={classes.divider} >
          <Typography className={classes.subTitle} variant="body1" >
            {activeStep === 0 ? ("Selecciona una de las opciones siguientes:") : ("Llena los campos que consideres necesarios para realizar tu búsqueda.")}
          </Typography>
          </Divider>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)} noValidate>
              {GetStepContent(activeStep)}
              {isStepOptional(activeStep) && (
                <>
                  <Button
                    className={classes.btnPDN}
                    disabled={activeStep === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                  >
                    Regresar
                  </Button>
                  <Button
                    className={classes.btnPDN}
                    variant="contained"
                    color="primary"
                    onClick={() => methods.resetField(name)}
                  >
                    Limpiar
                  </Button>
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
                </>
              )}
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default LinaerStepper;
