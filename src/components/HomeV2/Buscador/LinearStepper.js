import React, { useState } from "react";
import { InputLabel, FormControl, Typography, TextField, Button, Stepper, Step, StepLabel, Radio, RadioGroup, FormControlLabel, Select, MenuItem } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useForm, Controller, FormProvider, useFormContext, } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Tipo de Búsqueda",
    "Filtros de Búsqueda",
    "Resultados de Búsqueda"
  ];
}

const PersonasServidorasPublicasSancionados = () => {
  const { control } = useFormContext();
  /*
  1.- Servidores publicos sancionados
	- Nombre
	- AP1
	- AP2
	- Institución
	- Tipo de sanción (select)
  */
  return (
    <>
      <Controller
        control={control}
        name="nombres"
        render={({ field }) => (
          <TextField
            id="nombres"
            label="Nombre(s)"
            variant="outlined"
            placeholder="Ingresa el nombre o nombres"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="primerApellido"
        render={({ field }) => (
          <TextField
            id="primerApellido"
            label="Primer Apellido"
            variant="outlined"
            placeholder="Ingresa el primer apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="segundoApellido"
        render={({ field }) => (
          <TextField
            id="segundoApellido"
            label="Segundo Apellido"
            variant="outlined"
            placeholder="Ingresa el segundo apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="institucion"
        render={({ field }) => (
          <TextField
            id="institucion"
            label="Institución"
            variant="outlined"
            placeholder="Ingresa la institución"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="tipoSancion"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={'normal'}>
          <InputLabel id="labelTipoSancion">Tipo de Sanción</InputLabel>
          <Select
            labelId="tipoSancion"
            id="tipoSancion"
            value={'Tipo Sanción'}
            label="Tipo de Sanción"
            autoWidth
            {...field}
          >
            <MenuItem value={10}>Inhabilitado</MenuItem>
            <MenuItem value={20}>Multado</MenuItem>
            <MenuItem value={30}>Suspención del empleo, cargo o comisión</MenuItem>
            <MenuItem value={40}>Destitución del empleo, cargo o comisión</MenuItem>
            <MenuItem value={50}>Indemnización resarcitoria</MenuItem>
            <MenuItem value={60}>Sanción económica</MenuItem>
            <MenuItem value={70}>Otro</MenuItem>
          </Select>
        </FormControl>
          
        )}
      />
    </>
  );
};
const PersonasServidorasPublicasParticipanEnContrataciones = () => {
  const { control } = useFormContext();
  /*
  2.- Personas servidoras pub que participan contrataciones
	- Nombre
	- AP1
	- AP2
	- Institución
	- Tipo de procedimiento (select)
  */
  return (
    <>
      <Controller
        control={control}
        name="nombres"
        render={({ field }) => (
          <TextField
            id="nombres"
            label="Nombre(s)"
            variant="outlined"
            placeholder="Ingresa el nombre o nombres"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="primerApellido"
        render={({ field }) => (
          <TextField
            id="primerApellido"
            label="Primer Apellido"
            variant="outlined"
            placeholder="Ingresa el primer apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="segundoApellido"
        render={({ field }) => (
          <TextField
            id="segundoApellido"
            label="Segundo Apellido"
            variant="outlined"
            placeholder="Ingresa el segundo apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="institucion"
        render={({ field }) => (
          <TextField
            id="institucion"
            label="Institución"
            variant="outlined"
            placeholder="Ingresa la institución"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="tipoProcedimientoContratacion"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={'normal'}>
            <InputLabel id="demo-simple-select-label">Tipo de Procedimiento</InputLabel>
            <Select
              labelId="tipoProcedimientoContratacion"
              id="tipoProcedimientoContratacion"
              value={'Tipo de Procedimiento de contratación'}
              label="Tipo de Procedimiento de contratación"
              
              {...field}
            >
              <MenuItem value={10}>Adjudicación directa</MenuItem>
              <MenuItem value={20}>Invitación a tres</MenuItem>
              <MenuItem value={30}>Licitación pública</MenuItem>
            </Select>
          </FormControl>
          
        )}
      />
    </>
  );
};

const PersonasServidorasPublicasYSusDeclaraciones = () => {
  const { control } = useFormContext();
  /*
  3.- Personas servidoras pub y declaraciones patri
	- Nombre
	- AP1
	- AP2
	- Institución
	- Empleo, cargo, comisión
  */
  return (
    <>
      <Controller
        control={control}
        name="nombres"
        render={({ field }) => (
          <TextField
            id="nombres"
            label="Nombre(s)"
            variant="outlined"
            placeholder="Ingresa el nombre o nombres"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="primerApellido"
        render={({ field }) => (
          <TextField
            id="primerApellido"
            label="Primer Apellido"
            variant="outlined"
            placeholder="Ingresa el primer apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="segundoApellido"
        render={({ field }) => (
          <TextField
            id="segundoApellido"
            label="Segundo Apellido"
            variant="outlined"
            placeholder="Ingresa el segundo apellido"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="institucion"
        render={({ field }) => (
          <TextField
            id="institucion"
            label="Institución"
            variant="outlined"
            placeholder="Ingresa la institución"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="empleoCargoComision"
        render={({ field }) => (
          <TextField
            id="empleoCargoComision"
            label="Empleo, cargo o comisión"
            variant="outlined"
            placeholder="Ingresa el empleo, cargo o comisión"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

const EmpresasSancionadaPorCorrupcion = () => {
  const { control } = useFormContext();
  /*
  4.- Empresas sancionadas por actos de corrupción
	- Nombre / Razón social
	- Intitución donde presto el servicio
	- Tipo de sanción (select)
  */
  return (
    <>
      <Controller
        control={control}
        name="nombreRazonSocial"
        render={({ field }) => (
          <TextField
            id="nombreRazonSocial"
            label="Nombre o razón social"
            variant="outlined"
            placeholder="Ingresa el nombre o razón social"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="institucion"
        render={({ field }) => (
          <TextField
            id="institucion"
            label="Institución"
            variant="outlined"
            placeholder="Ingresa la institución donde presto el servicio"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="tipoSancion"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={'normal'}>
            <InputLabel id="labelTipoSancion">Tipo de Sanción</InputLabel>
            <Select
              labelId="tipoSancion"
              id="tipoSancion"
              value={'Tipo Sanción'}
              label="Tipo de Sanción"
              autoWidth
              {...field}
            >
              <MenuItem value={10}>Inhabilitado</MenuItem>
              <MenuItem value={20}>Multado</MenuItem>
              <MenuItem value={30}>Suspención de actividades</MenuItem>
              <MenuItem value={40}>Disolución de la sociedad</MenuItem>
              <MenuItem value={50}>Amonestación</MenuItem>
              <MenuItem value={60}>Indemnización por los daños y perjuicios ocasionados a la Hacienda Pública Federal, local o municipal, o al patrimonio de los entes públicos</MenuItem>
              <MenuItem value={70}>Sanción económica</MenuItem>
              <MenuItem value={80}>Otro</MenuItem>
            </Select>
          </FormControl>
          
        )}
      />

    </>
  );
};

const EmpresasTienenContratosGob = () => {
  const { control } = useFormContext();
  /*
  5.- Empresas que tienen contratos con el gobierno
	- Nombre / Razón social
	- Bien o servicio que se otorgo al gobierno (TOOLTIP con descripción o botón informativo)
  */
  return (
    <>
      <Controller
        control={control}
        name="nombreRazonSocial"
        render={({ field }) => (
          <TextField
            id="nombreRazonSocial"
            label="Nombre o razón social"
            variant="outlined"
            placeholder="Ingresa el nombre o razón social"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="bienServicioOtorgado"
        render={({ field }) => (
          <TextField
            id="bienServicioOtorgado"
            label="Bien o servicio que se otorgo al gobierno"
            variant="outlined"
            placeholder="Ingresa el bien o servicio que se otorgo al gobierno"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};

const InstitucionesRealizaronContrataciones = () => {
  const { control } = useFormContext();
  /*
  6.- Instituciones que realizan contrataciones públicas
	- Institución contratante
	- Bien o servicio que se otorgo al goobierno (TOOLTIP con descripción o botón informativo) 
	- Tipo de procedimiento de contratación (select)
  */
  return (
    <>
      <Controller
        control={control}
        name="institucionContratante"
        render={({ field }) => (
          <TextField
            id="institucionContratante"
            label="Institución contratante"
            variant="outlined"
            placeholder="Ingresa la institución contratante"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="bienServicioOtorgado"
        render={({ field }) => (
          <TextField
            id="bienServicioOtorgado"
            label="Bien o servicio"
            variant="outlined"
            placeholder="Ingresa el bien o servicio que se otorgo al gobierno"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="tipoProcedimientoContratacion"
        render={({ field }) => (
          <FormControl fullWidth={true} margin={'normal'}>
            <InputLabel id="demo-simple-select-label">Tipo de Procedimiento</InputLabel>
            <Select
              labelId="tipoProcedimientoContratacion"
              id="tipoProcedimientoContratacion"
              value={'Tipo de Procedimiento de contratación'}
              label="Tipo de Procedimiento de contratación"
              
              {...field}
            >
              <MenuItem value={10}>Adjudicación directa</MenuItem>
              <MenuItem value={20}>Invitación a tres</MenuItem>
              <MenuItem value={30}>Licitación pública</MenuItem>
            </Select>
          </FormControl>
          
        )}
      />

    </>
  );
};

function FiltrosBusqueda(props) {
  let tipoBusqueda = props.tipoBusqueda;
  //console.log(props.tipoBusqueda)
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
  const [name, setName] = useState('')
  const steps = getSteps();

  function GetStepContent(step) {
    switch (step) {
      case 0:
        return <TipoBusqueda />;
      case 1:
        return <FiltrosBusqueda tipoBusqueda={name}  />;
      default:
        return "desconocido";
    }
  }

  function TipoBusqueda() {
    const opciones = [
    { label: "Personas Servidoras Públicas Sancionadas", value: "psp-sancionados" },
    { label: "Personas Servidoras Públicas que participan en contrataciones", value: "psp-participan" },
    { label: "Personas Servidoras Públicas y sus declaraciones patrimoniales", value: "psp-declaraciones" },
    { label: "Empresas sancionadas por actos corrupción", value: "empresas-sancionadas"},
    { label: "Empresas que tiene contratos con el gobierno", value: "empresas-contratos"},
    { label: "Instituciones que realizaron contrataciones públicas", value: "instituciones-contrataciones"},
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
                  onChange={e => setName(e.target.value)}
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

  const handleNext = (data) => {
    console.log(data);
    if (activeStep === steps.length - 2) {
      fetch("https://api.plataformadigitalnacional.org/s3p/charts/getAnioSancion")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleRestart = () => {
    setActiveStep(0);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
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
          <Button
            className={classes.button}
            disabled={activeStep === 0}
            variant="contained"
            color="primary"
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
                className={classes.button}
                disabled={activeStep === 0}
                variant="contained"
                color="primary"
                onClick={handleBack}
              >
                Regresar
              </Button>
              {/* {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  Omitir
                </Button>
              )} */}
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  /* onClick={handleSkip} */
                >
                  Limpiar
                </Button>
              )}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={name === ''}
                // onClick={handleNext}
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
