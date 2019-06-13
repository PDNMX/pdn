import {Typography} from "@material-ui/core"
import React from "react";
import ReactJson from 'react-json-view';
import rp from "request-promise";
import {withStyles} from "@material-ui/core/styles";
import ArrowDropDown from "@material-ui/icons/ArrowRight";
import Link from '@material-ui/core/Link';

const styles = theme => ({
    root : {
        flexGrow: 1
    }
});

class Especificaciones extends React.Component {

    state = {
        oas: ["cargando"],
        example: ["cargando"]
    };

    componentDidMount() {

        let promises = [];

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S2/oas/OAS_API_servidores_intervienen_contrataciones.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S2/Resp_API_servidores_intervienen_contrataciones.json',
            method: 'GET',
            json: true
        }));

        Promise.all(promises).then(data => {

            //console.log(data[1].results[0]);
            this.setState({
                oas: data[0],
                example: data[1]
            })
        }).catch(error => {
            this.setState({
                oas: ['error'],
                example: ['error']
            })
        });
    }

    render () {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h5" paragraph>
                    Especificaciones
                </Typography>

                <Typography paragraph>
                    Esta sección contiene la especificación completa del API de Servidores Públicos que Intervienen en Contrataciones en el formato OAS.
                    La especificación puede ser interpretada usando las herramientas compatibles con el OAS o <Link href="https://swagger.io/tools/">Swagger</Link>.
                </Typography>

                <Typography paragraph>
                    Da click sobre el símbolo <ArrowDropDown/> para ver más detalles. Puedes consultar el archivo JSON completo en la
                    siguiente <Link href="https://github.com/PDNMX/api_docs/blob/master/S2/oas/OAS_API_servidores_intervienen_contrataciones.json">URL</Link>.
                </Typography>
                <ReactJson src={this.state.oas} collapsed={4}/>

                <br/>
                <Typography variant="h5" paragraph>
                    Ejemplo de respuesta
                </Typography>

                <Typography paragraph>
                    Da click sobre el símbolo <ArrowDropDown/> para ver más detalles.
                    Puedes consultar el archivo JSON completo en la siguiente <Link href="https://github.com/PDNMX/api_docs/blob/master/S2/Resp_API_servidores_intervienen_contrataciones.json">URL</Link>.
                </Typography>


                <ReactJson src={this.state.example} />


            </div>
        );
    }
}


export default withStyles(styles)(Especificaciones);