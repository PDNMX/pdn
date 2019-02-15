import React from 'react';
import Button from '@material-ui/core/Button';
import Ajv from 'ajv';
import localize from 'ajv-i18n';
//let SwaggerParser = require('swagger-parser');
import Parser from 'swagger-parser';

class UploadForm extends React.Component {
    state = {
        file: '',
        disabled: false,
        label: 'Cargar Archivo'
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     let upload = this.state.file;
    //     // fetch('https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json')
    //     //   .then(
    //     //     function(response) {
    //     //       if (response.status !== 200) {
    //     //         console.log('Error al obtener la especificación: ' +
    //     //           response.status);
    //     //         return;
    //     //       }
    //     //       response.json().then(function(data) {
    //     //         SwaggerParser.validate(data, function(err, esquema) {
    //     //           if (err) {
    //     //             console.error(err);
    //     //           }
    //     //           else {
    //     //             let ajv = new Ajv({ allErrors: true });
    //     //             let validate = ajv.compile(esquema.components.schemas.Declaraciones);
    //     //             let valid = validate(JSON.parse(upload));
    //     //             if (valid) {
    //     //                 console.log('Valid!');
    //     //                 this.props.onResults(valid)
    //     //             } else {
    //     //                 console.log('Invalid: ' + ajv.errorsText(validate.errors));
    //     //                 this.props.onResults(ajv.errorsText(validate.errors))
    //     //             }
    //     //           }
    //     //         });
    //     //       });
    //     //     }
    //     //   )
    //     //   .catch(function(err) {
    //     //     console.log('Fetch Error :-S', err);
    //     //   });
    //     fetch('https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json')
    //       .then(res => res.json())
    //       .then(results => {
    //         // console.log(results)
    //         SwaggerParser.validate(results)
    //           .then((esquema) => {
    //             // this.props.onResults(api)
    //             let ajv = new Ajv({ allErrors: true });
    //             let validate = ajv.compile(esquema.components.schemas.Declaraciones);
    //             let valid = validate(JSON.parse(upload));
    //             if (valid) {
    //                 // console.log('Valid!');
    //                 this.props.onResults(valid)
    //             } else {
    //                 // console.log('Invalid: ' + ajv.errorsText(validate.errors));
    //                 this.props.onResults(validate.errors)
    //             }
    //           })
    //         .catch(function(err) {
    //           console.error(err);
    //         });
    //     })
    //   }

// Handle Upload Using FileReader
    handleFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        let upload;
        reader.onloadend = (event) => {
            // console.log(event.target.result);
            this.setState({ file: event.target.result });
            upload = event.target.result;
            this.setState({disabled: !this.state.disabled, label: 'Validando'});
        };

        reader.readAsText(file);

        fetch('https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json')
            .then(res => res.json())
            .then(results => {
                // console.log(results)
                Parser.validate(results)
                    .then((esquema) => {
                        // this.props.onResults(api)
                        let ajv = new Ajv({ allErrors: true });
                        let validate = ajv.compile(esquema.components.schemas.Declaraciones);
                        let valid = validate(JSON.parse(upload));
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
                        console.error(err);
                    });
            })
    };

    render() {
        return (
            <div>
                <Button variant="contained" component="label" disabled={this.state.disabled} size='large'>
                    {this.state.label}
                    <input onChange={this.handleFile} accept="application/json" type="file" style={{ display: "none" }}
                    />
                </Button>
            </div>
        );
    }
}


export default UploadForm;