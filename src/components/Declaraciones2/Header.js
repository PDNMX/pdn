import React, {useState} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./header.css";
import { Grid, Typography } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import BarraLogoMenu from "../Compartidos/BarraLogoMenu";
import Particles from 'react-particles-js';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  buttons: {
    color: "#666666"
  },
  item: {
    maxWidth: 1200
  },
  href: {
    textDecoration: "none",
    color: "inherit"
  },
  blog: {
    textTransform: "none"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  container1: {
    paddingTop: "75px",
    paddingBottom: "75px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "relative",
    background: "linear-gradient(0deg, rgba(6,13,21,1) 0%, rgba(64,114,129,1) 100%)",
  },
  container2: {
    paddingTop: "75px",
    paddingBottom: "75px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "relative"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  item1: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  item2: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  item3: {
    padding: "30px"
  },
  s2: {
    maxWidth: "150px"
  },
  whiteText: {
    color: "#fff"
  },
  particulas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
},
});

const Header = props => {
    const { classes, logo, titulo, subtitulo } = props;
    const isMdUp = useIsWidthUp("md");
    const [achorEl, setAchorEl] = useState(null);


  const handleChange = event => {
    setAchorEl({ auth: event.target.checked });
  };

    const handleMenu = event => {
        setAchorEl({ anchorEl: event.currentTarget });
  };

    const handleClose = () => {
        setAchorEl({ anchorEl: null });
  };



    return (
      <div className={classes.root}>
        <BarraLogoMenu />
        <Grid container spacing={0} className="breadcrumb" justifyContent="center">
          <Grid item xs={12} style={{ maxWidth: 1200, margin: "0 auto" }}>
            <ul>
              <li>
                <Link className={classes.link} to="/">
                  Plataforma Digital Nacional
                </Link>
              </li>
              <li>Declaraciones</li>
            </ul>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          className={classNames(classes.container1, "servidores")}
          justifyContent="center"
        >
          <Particles 
            className={classes.particulas}
            params={{
                "particles": {
                    "number": {
                        "value": 24,
                        "density": {
                          "enable": true,
                          "value_area": 800
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "speed": 1,
                        "out_mode": "out"
                    },
                    "shape": {
                        "type": [
                            "images"
                        ],
                        "images": [
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/1.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/2.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/3.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/4.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/5.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/6.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/7.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/8.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/9.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/10.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/11.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/12.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/13.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                              "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/14.svg",
                              "height": 30,
                              "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/15.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/16.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/17.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/18.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/19.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/20.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/21.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/22.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/23.svg",
                                "height": 30,
                                "width": 30
                            },
                            {
                                "src": process.env.PUBLIC_URL + "/img/flotantes/declaraciones/24.svg",
                                "height": 30,
                                "width": 30
                            },
                        ]
                    },
                    "size": {
                        "value": 30,
                        "random": false,
                        "anim": {
                            "enable": true,
                            "speed": 4,
                            "size_min": 10,
                            "sync": false
                        }
                    }
                },
                "retina_detect": true
            }}
        />
          <Grid
            item
            xs={12}
            md={4}
            align={isMdUp ? "right" : "center"}
            className={classes.item1}
          >
            <img src={logo} alt="Sistema 1" className={classes.s2} />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            className={classes.item2}
            align={isMdUp ? "left" : "center"}
          >
            <Typography
              variant="h4"
              paragraph
              className={classes.whiteText}
              style={{ fontWeight: 600 }}
            >
              {subtitulo}
            </Typography>
            <Typography
              variant="h4"
              paragraph
              className={classes.whiteText}
              style={{ fontWeight: 300 }}
            >
              {titulo}
            </Typography>
            {/* <Typography
              className={classes.whiteText}
              style={{ fontSize: "18px", fontWeight: 500, maxWidth: 600 }}
            >
              Consulta y visualiza los datos <strong>públicos</strong> de
              las declaraciones patrimoniales, y de intereses, así como la
              constancia de declaración anual de impuestos de las y los
              servidores públicos.
            </Typography> */}
          </Grid>
        </Grid>
      </div>
    );

}

export default withWidth()(withStyles(styles)(Header));
