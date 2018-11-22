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
    {'key': '1', 'title': 'Servidores públicos que intervienen en procesos de contrataciones públicas', 'content': img2, 'to': '/servidores','active':true},
    {'key': '2', 'title': 'Servidores públicos y particulares sancionados', 'content': img5, 'to': '/sancionados','active':true},
    {'key': '3', 'title': 'Evolución patrimonial, declaración de intereses y constancia de presentación de declaración fiscal', 'content': img1, 'to': '/home','active':false},
    {'key': '4', 'title': 'Información pública de contrataciones', 'content': img3, 'to': '/home','active':false},
    {'key': '5', 'title': 'Denuncias públicas de faltas administrativas y hechos de corrupción', 'content': img4, 'to': '/home','active':false},
    {'key': '6', 'title': 'Información y comunicación del Sistema Nacional de Fiscalización', 'content': img6, 'to': '/home','active':false}
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
                                    <Card titleCard={prop.title} content={prop.content} to={prop.to} active={prop.active}/>
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