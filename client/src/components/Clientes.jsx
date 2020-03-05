import React, { Fragment, Component } from "react";
import { Query, Mutation } from "react-apollo";
import { CLIENTES_QUERY } from "../querys/index.js";
import { Link } from "react-router-dom";
import { ELIMINAR_CLIENTE } from '../mutations/index.js';
import Paginador from './Paginador.jsx';

class Clientes extends Component{

  state={
    paginador: {
      offset: 0,
      actual: 1
    }
  }

  render() {
    return(
      //Consulting DB
      <Query query={CLIENTES_QUERY} pollInterval={500}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          //Consulting
          if (loading) return "Carg";
          //Error Message
          if (error) return `Error: ${error.message}`;
          //Show Data'sf
          return (
            <Fragment>
              <h2 className="text-center">Listado de Clientes</h2>
              <ul className="list-group mt-4">
                {data.getClientes.map(item => {
                  const {id} = item;
                  return(
                    <li key={item.id} className="list-group-item mt-4">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                          {item.nombre} {item.apellido} - {item.empresa}
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                        <Mutation mutation={ELIMINAR_CLIENTE}>
                          { eliminarCliente => (

                          <button
                              className="btn btn-danger d-block d-md-inline-block"
                              onClick={ ()=>{
                                if(window.confirm(`Seguro que desea eliminar el Cliente: ${item.nombre +' - ' + item.apellido}`))
                                    {eliminarCliente({
                                            variables: {id}
                                          })
                                        } }}
                            >&times; Eliminar</button>
                            )}
                          
                        </Mutation>
                          <Link
                            to={`/cliente/editar/${item.id}`}
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
              />
            </Fragment>
          );
        }}
      </Query>
   );
  }
}

export default Clientes;
