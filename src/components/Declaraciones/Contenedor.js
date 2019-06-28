import React from "react";
import { withStyles } from "@material-ui/core/styles";



import S3 from "../../assets/iconos_azul/1_icono.svg";
import background from "../../assets/img/pdn_sis1.jpeg";



import Header from "../Header";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});


const titulo="Declaraciones";
const copy="Consulta, visualiza y descarga los datos de las declaraciones patrimoniales, de intereses y las constancias de la declaración fiscal de los servidores públicos.";

class Contenedor extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header logo={S3} titulo={titulo} copy={copy} background={background} />
      </div>
    );
  }
}

export default withStyles(styles)(Contenedor);
