import Typography from "@material-ui/core/Typography";
import React from "react";
import ReactJson from 'react-json-view';
import rp from "request-promise";
import {withStyles} from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';

const styles = theme => ({
    root : {
        flexGrow: 1
    }
});

class Especificaciones extends React.Component {

    state = {
        oas_particulares: ["cargando"],
        example_particulares: ["cargando"],
        oas_servidores: ["cargando"],
        example_servidores: ["cargando"]
    };

    componentDidMount() {

        let promises = [];

        //Particulares
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Particulares_Sancionados.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/Resp_API_Particulares_Sancionados.json',
            method: 'GET',
            json: true
        }));

        //Servidores públicos
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Servidores_Sancionados.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/Resp_API_Servidores_Sancionados.json',
            method: 'GET',
            json: true
        }));

        Promise.all(promises).then(data => {

            //console.log(data[1].results[0]);
            this.setState({
                oas_particulares: data[0],
                example_particulares: data[1],
                oas_servidores: data[2],
                example_servidores: data[3]
            })
        });
    }

    render () {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h5" id="especificaciones" paragraph>
                    Especificaciones
                </Typography>

                <Typography paragraph>
                    Esta sección contiene la especificación completa del API de declaraciones en el formato OAS. La especificación puede ser interpretada usando las herramientas compatibles con el OAS o <Link href="https://swagger.io/tools/">Swagger</Link>.
                </Typography>

                <Typography variant='h6' paragraph>
                    Servidores públicos sancionados
                </Typography>
                <ReactJson src={this.state.oas_servidores} collapsed={4}/>

                <br/>

                <Typography variant="h6" id="ejemplos" paragraph>
                    Ejemplo de respuesta - Servidores públicos sancionados
                </Typography>

                <ReactJson src={this.state.example_servidores} />

                <br/>

                <Typography variant="h6" paragraph>
                    Particulares sancionados
                </Typography>
                <ReactJson src={this.state.oas_particulares} collapsed={4}/>

                <br/>


                <Typography variant="h6" paragraph>
                   Ejemplo de respuesta - Particulares sancionados
                </Typography>
                <ReactJson src={this.state.example_particulares} />
            </div>
        );
    }
}


export default withStyles(styles)(Especificaciones);