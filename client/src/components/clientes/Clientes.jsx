import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import { CLIENTES_QUERY } from "../../querys/index.js";
import { Link, withRouter } from "react-router-dom";
import { ELIMINAR_CLIENTE } from "../../mutations/index.js";
import Paginador from "../layaut/Paginador.jsx";
import Exito from '../alertas/Exito.jsx';
import Spiner from '../layaut/Spiner.jsx';

class Clientes extends Component {
  limite = 10;

  state = {
    paginador: {
      offset: 0,
      actual: 1
    },
    alerta:{
      mostrar: false,
      mensaje: ''
    }
  };

  paginaAnt = () => {
    this.setState({
      paginador: {
        offset: this.state.paginador.offset - this.limite,
        actual: this.state.paginador.actual - 1
      }
    });
  };
  paginaSig = () => {
    this.setState({
      paginador: {
        offset: this.state.paginador.offset + this.limite,
        actual: this.state.paginador.actual + 1
      }
    });
  };

  render() {

    const { alerta: { mostrar, mensaje } } = this.state;
    const alerta = (mostrar) ? <Exito mensaje= { mensaje }/> : '';

    //Get ID of Vendedor para mostrar sus Clientes

    //console.log(this.props.session.getUsuario)
    let rol;
    try{

      rol = this.props.session.getUsuario.rol;

    }catch(error){
      this.props.history.push('/login');
    }

      let id;
      
      if(rol === "VENDEDOR"){
        id = this.props.session.getUsuario.id;
      }else{
        id = "";
      }
    return (
      //Consulting DB
      <Query
        query={CLIENTES_QUERY}
        pollInterval={500}
        variables={{
         limite: this.limite, 
         offset: this.state.paginador.offset, 
         vendedor: id}}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          //Consulting
          if (loading) return <Spiner/>;
          //Error Message
          if (error) return `Error: ${error.message}`;
          //Show Data'sf
          //console.log(data.totalClientes)
          return (
            <Fragment>
              <h2 className="text-center">Listado de Clientes</h2>
              {alerta}
              <ul className="list-group mt-4">
                {data.getClientes.map(item => {
                  const { id } = item;
                  return (
                    <li key={item.id} className="list-group-item mt-4">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                          {item.nombre} {item.apellido} - {item.empresa}
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                          <Link 
                          to={`/pedidos/nuevo/${id}`}
                          className="btn btn-warning d-block d-md-inline-block mr-2 text-center"

                          >
                            &#43; Nuevo Pedido
                          </Link>
                          <Link 
                          to={`/pedidos/${id}`}
                          className="btn btn-primary d-block d-md-inline-block mr-2 text-center"

                          >
                            &#43; Ver Pedidos
                          </Link>
                          <Mutation 
                            mutation={ELIMINAR_CLIENTE}
                            onCompleted= {(data) => {
                              this.setState({
                                alerta: {
                                  mostrar: true,
                                  mensaje: data.eliminarCliente
                                }
                              })
                            }}
                            >
                            {eliminarCliente => (
                              <button
                                className="btn btn-danger d-block d-md-inline-block"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Seguro que desea eliminar el Cliente: ${item.nombre +
                                        " - " +
                                        item.apellido}`
                                    )
                                  ) {
                                    eliminarCliente({
                                      variables: { id }
                                    });
                                  }
                                }}
                              >
                                &times; Eliminar
                              </button>
                            )}
                          </Mutation>
                          <Link
                            to={`/clientes/editar/${item.id}`}
                            className="btn btn-success d-block d-md-inline-block ml-2"
                          >
                            Editar Cliente
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Paginador
                actual={this.state.paginador.actual}
                total={data.totalClientes}
                limite={this.limite}
                paginaAnt={this.paginaAnt}
                paginaSig={this.paginaSig}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Clientes);
