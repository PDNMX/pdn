import React, { Component } from "react";
import * as ConstClass from "../ConstValues.js";

class BusquedaForm extends Component {
  constructor() {
    super();

    this.state = {
      names: "",
      surname_a: "",
      office: "",
      nivel: ""
    };

    this.searchUsers = this.searchUsers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.searchUsers}>
        <div className="row">
          <div className="col-sm-4">
            <p>
              Nombres
              <input
                type="text"
                className="pdn_input"
                name="names"
                value={this.state.names}
                onChange={this.handleInputChange}
              />
            </p>
          </div>
          <div className="col-sm-4">
            <p>
              Primer apellido
              <input
                type="text"
                className="pdn_input"
                name="surname_a"
                value={this.state.surname_a}
                onChange={this.handleInputChange}
              />
            </p>
          </div>
          <div className="col-sm-4">
            <p>
              Oficina
              <select
                className="pdn_input"
                name="office"
                value={this.state.office}
                onChange={this.handleInputChange}
              >
                <option value="">Selecciona una oficina</option>
                {ConstClass.OFICINAS.map((d, i) => (
                  <option key={"oficina-" + i}>{d}</option>
                ))}
              </select>
            </p>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-3">
                <p>Nivel de gobierno:</p>
              </div>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-sm-3">
                    <p>
                      <label>
                        <input
                          type="radio"
                          name="nivel"
                          checked={this.state.nivel === ""}
                          value=""
                          onChange={this.handleInputChange}
                        />
                        Todos
                      </label>
                    </p>
                  </div>
                  <div className="col-sm-3">
                    <p>
                      <label>
                        <input
                          type="radio"
                          name="nivel"
                          value="FED"
                          checked={this.state.nivel === "FED"}
                          onChange={this.handleInputChange}
                        />
                        Federal
                      </label>
                    </p>
                  </div>
                  <div className="col-sm-3">
                    <p>
                      <label>
                        <input
                          type="radio"
                          name="nivel"
                          value="EST"
                          checked={this.state.nivel === "EST"}
                          onChange={this.handleInputChange}
                        />
                        Estatal
                      </label>
                    </p>
                  </div>
                  <div className="col-sm-3">
                    <p>
                      <label>
                        <input
                          type="radio"
                          name="nivel"
                          value="MUN"
                          checked={this.state.nivel === "MUN"}
                          onChange={this.handleInputChange}
                        />
                        Municipal
                      </label>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <p>
              <input
                type="submit"
                className="pdn_input"
                name="submit"
                value="buscar"
              />
            </p>
          </div>
        </div>
      </form>
    );
  }

  /*
  
  /
  /  pasa los argumentos de la búsqueda a una 
  /  función que llama al api de búsqueda 
  /  (definidia en Busqueda, el parent)
  /
  
  */
  searchUsers(e) {
    e.preventDefault();
    this.props.getUsers(this.state);
  }

  /*
  
  /
  /  genera una sola "source of truth" para los 
  /  valores del formulario. En vue es lo de 
  /  v-model
  /
  
  */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}

export default BusquedaForm;
