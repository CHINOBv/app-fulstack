import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../querys'

import DatosCliente from './DatosCliente.jsx';
import ContentPedidos from './ContentPedidos.jsx';
import Spiner from '../layaut/Spiner.jsx';

						
export class NuevoPedido extends Component {
	render() {
		const { id } = this.props.match.params;
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Pedido</h1>
				<div className="row">
					<div className="col-md-3">
						<DatosCliente
							id={ id }
						/>
					</div>
					<div className="col-md-9">
						<Query 
							query={PRODUCTOS_QUERY}>
							{({ loading, error, data }) =>{
								if(loading) return <Spiner/>;
								if(error) return `Error: ${error.message}`;
								
								console.log(data)
								return(
									<ContentPedidos
										datas={data}
										id={id}
									/>
								)
								}}					
						</Query>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default NuevoPedido