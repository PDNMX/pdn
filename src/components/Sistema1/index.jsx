import React from "react";

import { Route, Switch } from "react-router-dom";
import { Grid, Box, Typography, Paper, Tab, Tabs } from "@mui/material";
import img from "../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg";
import evoImg from "../../assets/ico-evolucion.svg";
import withStyles from "@mui/styles/withStyles";

import Busqueda from "./Busqueda";
// import PerfilMaterialUI from '../Declaraciones/PerfilMaterialUI'
// import Stats from '../Declaraciones/Estadisticas/Stats'

import styles from "../style";
/* import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2' */
import pdnRoutes from "../../routes";
import HeaderV2 from "../HomeV2/HeaderV2";
import Disclaimer from "./Disclaimer";
import Evolucion from "./Evolucion";
// import MyPaper from './MyPaper'

const titulo =
  "Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal";
// const subtitulo = 'Declaraciones'
// const copy = 'Consulta y visualiza los datos <b>públicos</b> de las declaraciones patrimoniales, y de intereses, así como la constancia de declaración anual de impuestos de las y los servidores públicos.'

class Declaraciones extends React.Component {
  state = {
    open: true,
    tab: 0,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  tabs = [
    {
      label: "Buscador de persona servidora pública",
      icon: <img src={img} alt="buscador" />,
      content: <Busqueda />,
    },
    {
      label: "Evolución Patrimonial",
      icon: <img src={evoImg} alt="evolucion patrimonial" />,
      content: <Evolucion />,
    },
  ];

  render() {
    const { classes } = this.props;
    const system = pdnRoutes.find((route) => route.path === "/declaraciones");

    return (
      <div>
        <HeaderV2 section={system} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} className={classes.section}>
            <Box className={classes.tabsContainer}>
              <Tabs
                value={this.state.tab}
                onChange={(e, newValue) => this.setState({ tab: newValue })}
                className={classes.tabs}
                variant={window.innerWidth <= 960 ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                orientation={
                  window.innerWidth <= 960 ? "vertical" : "horizontal"
                }
                centered={window.innerWidth > 960}
              >
                {this.tabs.map((t, i) => (
                  <Tab
                    key={i}
                    className={classes.tab}
                    icon={
                      <Box className={classes.tabLabel}>
                        {React.cloneElement(t.icon, {
                          className: `${classes.svgIcon} ${classes.tabIcon}`,
                        })}

                        <span>{t.label}</span>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
            {/* <Grid container spacing={0}>
              <Grid
                item
                lg={3}
                xs={12}
                style={{ display: "flex", alignItems: "stretch" }}
              >
                <figure className={classes.selectedTab}>
                  <Typography variant="subtitle1" className={classes.labelCard}>
                    Buscador de una persona servidora pública
                  </Typography>
                </figure>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          className={classes.contentsSection}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Box>{this.tabs[this.state.tab].content}</Box>

          {/* <Switch>
            <Route exact path="/declaraciones" component={Busqueda} /> */}

          {/* <Route path="/declaraciones/perfil/:id?" component={PerfilMaterialUI} />
							<Route path="/declaraciones/estadisticas" component={Stats} /> */}
          {/* </Switch> */}
        </Grid>
        <Disclaimer open={this.state.open} handleClose={this.handleClose} />
      </div>
    );
  }
}

// class Declaraciones extends React.Component {
//   state = {
//     open: true,
//     tab: 0,
//   };

//   tabs = [
//     {
//       label: "Buscador de persona servidora pública",
//       content: <Busqueda />,
//     },
//     {
//       label: "Evolución Patrimonial",
//       content: <Evolucion />,
//     },
//   ];

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     const system = pdnRoutes.find((route) => route.path === "/declaraciones");

//     return (
//       <div>
//         <HeaderV2 section={system} />

//         <Grid container justifyContent="center" alignItems="center">
//           <Grid item xs={12} className={classes.section}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <Tabs
//                 value={this.state.tab}
//                 onChange={(e, newValue) => this.setState({ tab: newValue })}
//                 variant="scrollable"
//                 scrollButtons="auto"
//               >
//                 {this.tabs.map((t, i) => (
//                   <Tab key={i} label={t.label} />
//                 ))}
//               </Tabs>
//             </Box>

//             <Box sx={{ p: 2 }}>{this.tabs[this.state.tab].content}</Box>
//           </Grid>
//         </Grid>

//         <Disclaimer open={this.state.open} handleClose={this.handleClose} />
//       </div>
//     );
//   }
// }

export default withStyles(styles)(Declaraciones);
