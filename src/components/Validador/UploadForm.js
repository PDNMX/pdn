import React from 'react';
import Button from '@material-ui/core/Button';
import Ajv from 'ajv';
import localize from 'ajv-i18n';
//let SwaggerParser = require('swagger-parser');
import Parser from 'swagger-parser';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        background: '#ffe01b',//'#fecb6e'
    }
});

class UploadForm extends React.Component {
    state = {
        file: '',
        disabled: false,
        label: 'Cargar Archivo'
    };
// Handle Upload Using FileReader
    handleFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        let upload;
        reader.onloadend = (event) => {
          try {
            this.setState({ file: event.target.result });
            upload = JSON.parse(event.target.result);
            this.setState({disabled: !this.state.disabled, label: 'Validando'});
            fetch('https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json')
                .then(res => res.json())
                .then(results => {
                    Parser.validate(results)
                        .then((esquema) => {
                            let ajv = new Ajv({ allErrors: true });
                            let validate = ajv.compile(esquema.components.schemas.Declaraciones);
                            let valid = validate(upload);
                            this.setState({disabled: !this.state.disabled, label: 'Terminado'});
                            if (valid) {
                                // console.log('Valid!');
                                this.props.onResults(valid)
                            } else {
                                // console.log('Invalid: ' + ajv.errorsText(validate.errors));
                                localize.es(validate.errors)
                                this.props.onResults(validate.errors)
                            }
                        })
                        .catch(function(err) {
                            this.props.onResults(err);
                        });
                      })
          }
          catch (e) {
            this.props.onResults(e);
          }
        };
        reader.readAsText(file);
      };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Button variant="contained" component="label" disabled={this.state.disabled} size='large' className={classes.button}>
                    {this.state.label}
                    <input onChange={this.handleFile} accept="application/json" type="file" style={{ display: "none" }}
                    />
                </Button>
            </div>
        );
    }
}

UploadForm.propTypes= {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UploadForm);
