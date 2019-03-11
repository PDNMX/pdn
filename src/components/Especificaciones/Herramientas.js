import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Herramientas extends React.Component {

    render (){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h4" id="herramientas" paragraph>Herramientas para desarrollo web</Typography>

                <Typography paragraph>
                    La interconexión entre los sistemas de información de las Instituciones y la PDN se establecerá a través de Internet, usando servicios web o APIs con arquitectura REST (REpresentational State Transfer); REST es un modelo ampliamente usado para el desarrollo de sistemas Web. En la actualidad, existe gran variedad de herramientas de código abierto que permiten el desarrollo de APIs REST usando diferentes lenguajes de programación y tecnologías de bases de datos; entre las más destacados se encuentran:
                </Typography>

                <ul>
                    <li>
                        <Typography><b>Express JS</b></Typography>
                        <Typography>Lenguaje de programación: JavaScript</Typography>
                        <IconButton href="https://expressjs.com/">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <Typography><b>Django</b></Typography>
                        <Typography>Lenguaje de programación: Python</Typography>

                        <IconButton href="https://www.djangoproject.com/">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <Typography><b>Flask</b></Typography>
                        <Typography>Lenguaje de programación: Python</Typography>
                        <IconButton href="https://flask-restful.readthedocs.io/en/latest/quickstart.html">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <Typography><b>Spring</b></Typography>
                        <Typography>Lenguaje de programación: Java</Typography>
                        <IconButton href="https://spring.io/guides/gs/rest-service/" size="small">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <Typography><b>.NET Core</b></Typography>
                        <Typography>Lenguajes de programación: C#, Visual Basic, F# </Typography>
                        <IconButton href = "https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <Typography><b>Apigility</b></Typography>
                        <Typography>
                            Lenguaje de programación: PHP
                        </Typography>
                        <IconButton href="https://apigility.org/">
                            <LinkIcon/>
                        </IconButton>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withStyles (styles) (Herramientas);