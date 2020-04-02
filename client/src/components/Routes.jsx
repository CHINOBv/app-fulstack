import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//Clientes
import Header from "./layaut/Header.jsx";
import Clientes from "./clientes/Clientes.jsx";
import EditCliente from './clientes/EditCliente.jsx';
import NuevoCliente from "./clientes/NuevoCliente.jsx";

//Productos
import NuevoProducto from './productos/NuevoProducto.jsx';
import Productos from './productos/Productos.jsx';
import EditProducto from './productos/EditProducto.jsx';

//Pedidos
import NuevoPedido from './pedidos/NuevoPedido.jsx';
import PedidosClient from './pedidos/PedidosClient.jsx';

//Panel
import Panel from './panel/Panel.jsx'

//Auth
import Registro from './auth/Registro.jsx'
import Login from './auth/Login.jsx';

class Routes extends Component {
  
  render() {

  const { getUsuario } = this.props.session;
  //console.log(this.props.session)
    
  const mensaje = (getUsuario) ? ` Bienvenido: ${getUsuario.nombre} ` : <Redirect to="/login" />;

    return (
      <Router>
        <Fragment>
          <Header session={this.props.session}/>
          <div className="container">
          <p className="text-right">{mensaje}</p>
            <Switch>

              <Route exact path="/clientes" render={ () =>  <Clientes refetch={this.props.refetch} session={this.props.session}/> } />
              <Route exact path="/clientes/nuevo" render={ () => <NuevoCliente refetch={this.props.refetch} session={this.props.session}/> } />
              <Route exact path="/clientes/editar/:id" component={EditCliente} />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditProducto} />

              <Route exact path="/pedidos/nuevo/:id" render={ () => <NuevoPedido session={this.props.session}/> } />
              <Route exact path="/pedidos/:id" component={PedidosClient} />

              <Route exact path="/panel" component={Panel} />

              <Route exact path="/registro" render={() => <Registro session={this.props.session} />} />
              <Route exact path="/login" render={ () => <Login refetch={this.props.refetch}/> } />

            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
