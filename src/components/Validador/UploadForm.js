import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
/* import FormHelperText from '@mui/material/FormHelperText'; */
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Ajv from "ajv";
import addFormats from "ajv-formats"
import localize from "ajv-i18n";
//let SwaggerParser = require('swagger-parser');
import Parser from "swagger-parser";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import ReactGA from "react-ga";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text.main
  },
  button: {
    /* marginTop: theme.spacing(1), */
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    background: "#ffe01b",
    padding: "14.75px",
    
  },
  button2: {
    /* marginTop: theme.spacing(1), */
    marginBottom: theme.spacing(1),
    padding: "15px",
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: theme.palette.text.main
  },
  selectEmpty: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.main
  },
});

class UploadForm extends React.Component {
  state = {
    disabled: false,
    label: "Cargar Archivo",
    isSubmitting: false,
    formValues: {
      uploadJson: "",
      tipoSistema: "",
    },
    formErrors: {
      uploadJson: "",
      tipoSistema: "",
    },
    formValidity: {
      uploadJson: false,
      tipoSistema: false,
    },
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    /* const isSistema = name === "tipoSistema";
        const isUpload = name === "uploadJson"; */
    validity[name] = value.length > 0 || value instanceof File;
    fieldValidationErrors[name] = validity[name] ? "" : "Campo requerido";

    /* if (validity[name]) {
          if (isSistema) {
            validity[name] = value.length >= 2;
            fieldValidationErrors[name] = validity[name]
              ? ""
              : "Debes elegir un tipo de sistema";
          }
          if (isUpload) {
            validity[name] = value instanceof File || value.length >= 3;
            fieldValidationErrors[name] = validity[name]
              ? ""
              : "Debes cargar un archivo JSON";
          }
        } */
    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    console.log(formValues);
    if (Object.values(formValidity).every(Boolean)) {
      ReactGA.event({ category: 'validador1', action: 'click' });
      let file = this.state.formValues.uploadJson;
      /* console.log(file) */
      let reader = new FileReader();
      reader.onloadend = (event) => {
        let upload = JSON.parse(event.target.result);
        try {
          let tipoEsquema = this.state.formValues.tipoSistema;
          let urlTipoSistema;
          let esquemaOAS;
          switch (tipoEsquema) {
            case "s1I":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/OAS_API_Declaraciones_Inicial.json";
              esquemaOAS = "resDeclaraciones";
              break;
            case "s1M":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/OAS_API_Declaraciones_Modificacion.json";
              esquemaOAS = "resDeclaraciones";
              break;
            case "s1C":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/OAS_API_Declaraciones_Conclusion.json";
              esquemaOAS = "resDeclaraciones";
              break;
            case "s2":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S2/oas/OAS_API_servidores_intervienen_contrataciones.json";
              esquemaOAS = "resSpic";
              break;
            case "s3P":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Particulares_Sancionados.json";
              esquemaOAS = "resParticularesSancionados";
              break;
            case "s3SP":
              urlTipoSistema =
                "https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Servidores_Sancionados.json";
              esquemaOAS = "ssancionados";
              break;
            default:
              console.log(tipoEsquema);
              break;
          }

          this.setState({
            disabled: !this.state.disabled,
            label: "Validando...",
          });
          this.setState({ isSubmitting: true });
          fetch(urlTipoSistema)
            .then((res) => res.json())
            .then((results) => {
              Parser.validate(results)
                .then((esquema) => {
                  let ajv = new Ajv({ allErrors: true });
                  addFormats(ajv);
                  //ajv.addFormat("float", "^[-+]?[0-9]*\\.?[0-9]+$");
                  ajv.addKeyword("example");
                  /* let pathFix = 'esquema.components.schemas.' + esquemaOAS; */
                  console.log(esquema.components.schemas[esquemaOAS]);
                  let validate = ajv.compile(
                    esquema.components.schemas[esquemaOAS]
                  );
                  let valid = validate(upload);
                  console.log(valid);
                  this.setState({
                    disabled: !this.state.disabled,
                    label: "Terminado",
                  });
                  if (valid) {
                    // console.log('Valid!');
                    this.props.onResults(valid);
                    this.setState({ isSubmitting: false });
                  } else {
                    // console.log('Invalid: ' + ajv.errorsText(validate.errors));
                    localize.es(validate.errors);
                    this.props.onResults(validate.errors);
                    this.setState({ isSubmitting: false });
                  }
                })
                .catch(function (err) {
                  console.log(err);
                });
            });
        } catch (e) {
          this.props.onResults(e);
        }
      };
      reader.readAsText(file);
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        /* console.log(target) */
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    if (target.files !== undefined) {
      formValues[target.name] = target.files[0];
    } else {
      formValues[target.name] = target.value;
    }
    /* formValues[target.name] = target.value; */
    this.setState({ formValues });
    this.handleValidation(target);
  };

  render() {
    const { classes } = this.props;
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <div className={classes.root}>
        <Grid container direction="row" justifyContent="center" >
        <form onSubmit={this.handleSubmit}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              component="label"
              disabled={this.state.disabled}
              size="large"
              className={classes.button2}
            >
              {/* <i className="material-icons">cloud_upload</i> */}
              Cargar Archivo
              <input
                name="uploadJson"
                onChange={this.handleChange}
                accept="application/json"
                type="file"
                style={{ display: "none" }}
              />
            </Button>
            <div className="invalid-feedback">{formErrors.uploadJson}</div>
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-required-label">
              Sistema
            </InputLabel> */}
            <Select
              /* labelId="demo-simple-select-required-label" */
              id="demo-simple-select-required"
              name="tipoSistema"
              value={formValues.tipoSistema}
              onChange={this.handleChange}
              className={classes.selectEmpty}
              displayEmpty
              disabled={this.state.disabled}
              
            >
              <MenuItem value="">
                <em>Sistema</em>
              </MenuItem>
              <MenuItem value={"s1I"}>S1 - Inicial</MenuItem>
              <MenuItem value={"s1M"}>S1 - Modificación</MenuItem>
              <MenuItem value={"s1C"}>S1 - Conclusión</MenuItem>
              <MenuItem value={"s2"}>S2</MenuItem>
              <MenuItem value={"s3P"}>S3 - Particulares</MenuItem>
              <MenuItem value={"s3SP"}>S3 - Servidores Públicos</MenuItem>
            </Select>
            <div className="invalid-feedback">{formErrors.tipoSistema}</div>
            {/* <FormHelperText>Requerido</FormHelperText> */}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              className={classes.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validando..." : "Validar"}
            </Button>
          </FormControl>
        </form>
        </Grid>

      </div>
    );
  }
}

UploadForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadForm);
