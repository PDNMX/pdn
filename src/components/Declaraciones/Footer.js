import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <p className="pdn_footer">PDN</p>
                <h2>Plataforma Digital Nacional</h2>
                <p>Inteligencia de Datos Anticorrupción</p>
                <p className="libreuso">Libre uso</p>
                <p className="openk">Open knoeledge</p>
              </div>
              <div className="col-sm-3">
                <ul>
                  <li>Sistemas</li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/declaraciones"}`}>
                      Declaraciones
                    </a>
                  </li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/servidores"}`}>
                      Servidores en contrataciones
                    </a>
                  </li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/sancionados"}`}>
                      Sancionados
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-2">
                <ul>
                  <li>PDN</li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/about"}`}>
                      ¿Qué es la PDN
                    </a>
                  </li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/faq"}`}>
                      Preguntas frecuentes
                    </a>
                  </li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/blog"}`}>Blog</a>
                  </li>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/terminos"}`}>
                      Términos de uso
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="pdn_b_sesna">
          <div className="container">
            <div className="col-sm-12 text-center">
              <h2
                className="logo_sesna"
                style={{ margin: "15px auto", float: "none" }}
              >
                Secretaría Ejecutiva SNA
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
