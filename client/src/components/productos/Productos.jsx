import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { PRODUCTOS_QUERY } from '../../querys/index.js';
import { ELIMINAR_PRODUCTO } from '../../mutations/index.js';

import Exito from '../alertas/Exito.jsx';

class Productos extends Component {

	state={
		alerta: {
			mostrar: false,
			mensaje: ''
		}
	}

    render() {

		const { alerta: {mostrar,mensaje} } = this.state;

		const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return (
            <Fragment>
            	<h1 className="text-center mb-5"> Productos </h1>
            	{alerta}
				<Query
					query={ PRODUCTOS_QUERY }
					pollInterval={500}
				>
				{({ loading, error, data, startPolling, stopPolling })=>{
					if(loading) return "CARGANDO...";
					if(error) return `Error: ${error.message}`;
					console.log(data);
					return (
						<table className="table">
							<thead>
								<tr className="table-primary">
									<th scope="col"> Nombre </th>
									<th scope="col"> Precio </th>
									<th scope="col"> Existentes </th>
									<th scope="col"> Eliminar </th>
									<th scope="col"> Editar </th>
								</tr>
							</thead>
							<tbody>
								{data.getProductos.map(item =>{
									const {id} = item;
									return(
										<tr key={id}>
											<td>{item.nombre}</td>
											<td>{item.precio}</td>
											<td>{item.stock}</td>
											<td>
											<Mutation
												mutation={ ELIMINAR_PRODUCTO }
												onCompleted={ (data) => {
													//console.log(data)
													this.setState({
														alerta: {
															mostrar: true,
															mensaje: data.eliminarProducto
														}
													})
												}}
													>
												
												{eliminarProducto =>(
													<button
														className="btn btn-danger"
														onClick = {() => {
															if(window.confirm(`Esta Seguro de Eliminar el Producto: ${item.nombre}`))
															{eliminarProducto({
																variables: {id}
															});}
														}}
														>
														&times; Eliminar
													</button>
													)}

											</Mutation>
											</td>
											<td>
												<Link
												type="button"
												className="btn btn-success"
												to={`/productos/editar/${id}`}
												>
												Editar
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					);
				}}

				</Query>
            </Fragment>
        );
    }
}

export default Productos;
