import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Clientes
import Header from "./clientes/Header.jsx";
import Clientes from "./clientes/Clientes.jsx";
import EditCliente from './clientes/EditCliente.jsx';
import NuevoCliente from "./clientes/NuevoCliente.jsx";

//Productos
import NuevoProducto from './productos/NuevoProducto.jsx';
import Productos from './productos/Productos.jsx';
import EditProducto from './productos/EditProducto.jsx'

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
              <Route exact path="/producto/nuevo" component={NuevoProducto}/>
              <Route exact path= "/productos" component={Productos}/>
              <Route exact path= "/productos/editar/:id" component={EditProducto}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
