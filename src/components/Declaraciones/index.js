import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Contenedor from "./Contenedor";

class Declaraciones extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route render={props => <Contenedor location={props.location} />} />
      </BrowserRouter>
    );
  }
}

export default Declaraciones;
