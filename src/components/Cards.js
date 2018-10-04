import Grid from '@material-ui/core/Grid';
import Card from './SimpleCard';
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import img1 from "../assets/img/tresportresl.jpg";
import img2 from "../assets/img/servidoresl.jpg";
import img5 from "../assets/img/sancionadosl.jpg";
import img3 from "../assets/img/contrataciones.jpg";
import img4 from "../assets/img/denunciasl.jpg";
import img6 from "../assets/img/fiscal.jpg";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const charts1 = [
    {'key': '1', 'title': 'Declaraciones 3x3', 'content': img1, 'to': '/declaraciones'},
    {'key': '2', 'title': 'Servidores que intervienen en procesos de contratación', 'content': img2, 'to': '/servidores'},
    {'key': '3', 'title': 'Servidores públicos y particulares sancionados', 'content': img5, 'to': '/sancionados'},
    {'key': '4', 'title': 'Contrataciones públicas', 'content': img3, 'to': '/contrataciones'},
    {'key': '5', 'title': 'Denuncias públicas', 'content': img4, 'to': '/denuncias'},
    {'key': '6', 'title': 'Comunicación del Sistema Nacional de Fiscalización', 'content': img6, 'to': '/snf'}
];

class Cards extends React.Component{

    render () {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    {
                        charts1.map((prop, key) => {
                            return (
                                <Grid item  lg={4} md={6} sm={4} key={key}>
                                    <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </div>
        )
    }
}

Cards.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cards);