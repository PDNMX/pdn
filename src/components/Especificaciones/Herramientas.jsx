import React from 'react';
import {Typography, Link} from "@mui/material"
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#7A3D71',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
    link:{
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-word",
    },
    text: {
        color: theme.palette.text.primary,
        textAlign: 'justify',
    },
    title: {
    color: theme.palette.primary.main
    },
});

const Herramientas = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Typography variant="h5" paragraph className={classes.title}>Desarrollo web</Typography>

            <Typography paragraph className={classes.text}>
                La interoperabilidad entre los sistemas informáticos de las Instituciones y la PDN se establece a través de servicios web o APIs que intercambian información a través de Internet.
            </Typography>
            <Typography paragraph className={classes.text}>
                La comunicación con la PDN se realiza a través de servicios basados en el modelo REST (REpresentational State Transfer), una tecnología ampliamente usada para el desarrollo de aplicaciones web.
            </Typography>
            <Typography paragraph className={classes.text}>
                Existe gran variedad de herramientas de código abierto que facilitan el desarrollo de APIs REST, usando diversos lenguajes de programación y tecnologías de bases de datos.
                No es posible proporcionar una lista exhaustiva, pero a continuación se citan algunos ejemplos:
            </Typography>

            <ul className={classes.ul}>
                <li className={classes.li}>
                    <Link display='inline' href="https://expressjs.com/" target='_blank' className={classes.link}>
                        Express JS
                    </Link>
                    <Typography className={classes.text}>Lenguaje de programación: JavaScript</Typography>
                </li>
                <li className={classes.li}>
                    <Link display='inline' href="https://www.djangoproject.com/" target='_blank' className={classes.link}>
                        Django
                    </Link>
                    <Typography className={classes.text}>Lenguaje de programación: Python</Typography>
                </li>
                <li className={classes.li}>
                    <Link display='inline' href="https://flask-restful.readthedocs.io/en/latest/quickstart.html" target='_blank' className={classes.link}>
                        Flask
                    </Link>
                    <Typography className={classes.text}>Lenguaje de programación: Python</Typography>
                </li>
                <li className={classes.li}>
                    <Link display='inline' href="https://spring.io/guides/gs/rest-service/" target='_blank' className={classes.link}>
                        Spring
                    </Link>
                    <Typography className={classes.text}>Lenguaje de programación: Java</Typography>
                </li>
                <li className={classes.li}>
                    <Link display='inline' href="https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial" target='_blank' className={classes.link}>
                        .NET Core
                    </Link>
                    <Typography className={classes.text}>Lenguajes de programación: C#, Visual Basic, F# </Typography>
                </li>
                <li className={classes.li}>
                    <Link display='inline' href="https://apigility.org/" target='_blank' className={classes.link}>
                        Apigility
                    </Link>
                    <Typography className={classes.text}>
                        Lenguaje de programación: PHP
                    </Typography>
                </li>
            </ul>
        </div>
    );
};

export default withStyles (styles) (Herramientas);
