import React from 'react';
import {Typography} from "@mui/material"
import withStyles from '@mui/styles/withStyles';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
});

class Herramientas extends React.Component {

    render (){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h4" paragraph >Herramientas para desarrollo web</Typography>

                <Typography paragraph>
                    La interconexión entre los sistemas de información de las Instituciones y la PDN se establecerá a
                    través de Internet, usando servicios web o APIs con arquitectura REST (REpresentational State Transfer).
                    REST es un modelo ampliamente usado para el desarrollo de sistemas Web.
                    En la actualidad, existe gran variedad de herramientas de código abierto que permiten el
                    desarrollo de APIs REST usando diferentes lenguajes de programación y tecnologías de bases de datos; entre las más destacados se encuentran:
                </Typography>

                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <Typography display='inline'><b>Express JS</b></Typography>
                        <Typography>Lenguaje de programación: JavaScript</Typography>
                        <IconButton href="https://expressjs.com/" target='_blank' size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li className={classes.li}>
                        <Typography display='inline'><b>Django</b></Typography>
                        <Typography>Lenguaje de programación: Python</Typography>

                        <IconButton href="https://www.djangoproject.com/" target='_blank' size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li className={classes.li}>
                        <Typography display='inline'><b>Flask</b></Typography>
                        <Typography>Lenguaje de programación: Python</Typography>
                        <IconButton
                            href="https://flask-restful.readthedocs.io/en/latest/quickstart.html"
                            target='_blank'
                            size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li className={classes.li}>
                        <Typography display='inline'><b>Spring</b></Typography>
                        <Typography>Lenguaje de programación: Java</Typography>
                        <IconButton
                            href="https://spring.io/guides/gs/rest-service/"
                            target='_blank'
                            size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li className={classes.li}>
                        <Typography display='inline'><b>.NET Core</b></Typography>
                        <Typography>Lenguajes de programación: C#, Visual Basic, F# </Typography>
                        <IconButton
                            href = "https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial"
                            target='_blank'
                            size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li className={classes.li}>
                        <Typography display='inline'><b>Apigility</b></Typography>
                        <Typography>
                            Lenguaje de programación: PHP
                        </Typography>
                        <IconButton href="https://apigility.org/" target='_blank' size="large">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                </ul>
            </div>
        );
    }
}

Herramientas.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (styles) (Herramientas);