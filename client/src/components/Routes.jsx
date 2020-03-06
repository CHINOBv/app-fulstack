import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header.jsx";
import Clientes from "./clientes/Clientes.jsx";
import EditCliente from './clientes/EditCliente.jsx';
import NuevoCliente from "./clientes/NuevoCliente.jsx";

//<Route exact path='/cliente/editar/:id' component={EditCliente}/>
class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route exact path="/cliente/editar/:id" component={EditCliente} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
