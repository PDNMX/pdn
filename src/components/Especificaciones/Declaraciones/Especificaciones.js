import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import rp from 'request-promise';
import {withStyles} from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import LinkM from "@material-ui/core/Link";
import app from "../../../config/firebase";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        //width: '100%'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    flex: {
        flexGrow: 1
    },
    nested: {
        paddingLeft: theme.spacing.unit * 9
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        background: '#ffe01b',//'#fecb6e'
    },
    diagrama: {
        maxWidth: 900
    },
    paper: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    }
});

class ClippedDrawer extends React.Component {

    state = {
        oas: ["cargando"],
        example: ["cargando"],

        open: false,
        currentUser: null,
        loading: false,
        authenticated: false,

        anchorEl: null
    };
    //menu

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    componentDidMount() {

        let promises = [];
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/example.json',
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

        //this.setState({oas:  { "test": 123, "others": [ { "abc": 1 }, { "xyz": 999 } ] }, example: {}})
    }

    render() {

        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>

                {/*<div className={classes.appBar}>
                <PDNAppBar position="fixed" className={classes.appBar}/>
            </div>*/}

                <main className={classes.content}>

                    <Typography variant="h5" id="especificaciones" paragraph>
                        Especificaciones
                    </Typography>

                    <Typography paragraph>
                        Esta sección contiene la especificación completa del API de declaraciones en el formato OAS. La
                        especificación puede ser interpretada usando las herramientas compatibles con el OAS o <LinkM
                        href="https://swagger.io/tools/">Swagger</LinkM>.
                    </Typography>
                    <ReactJson src={this.state.oas} collapsed={4}/>

                    <br/>
                    <Typography variant="h5" id="ejemplos" paragraph>
                        Ejemplos de respuesta
                    </Typography>

                    <p>
                        <code>
                            https://dominio_institucion/declaraciones?api_key=ACXXXXXXXXXXXXXXXXXX&sort=asc&page=1&page_size=10&nombres=Carlos&
                            apellido1=Pérez&apellido2=López&curp=BEML920313HMCLNS09&rfc=GOAP780710RH7&id=a1b2c3d4&actualizacion=2017-07-21&
                            rfc_solicitante=GOAP780710RH7
                        </code>
                    </p>

                    <ReactJson src={this.state.example} collapsed={4}/>
                </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
