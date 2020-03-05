import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header.jsx";
import Clientes from "./Clientes.jsx";
//import EditCliente from './EditCliente.jsx';
import NuevoCliente from "./NuevoCliente.jsx";

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
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
