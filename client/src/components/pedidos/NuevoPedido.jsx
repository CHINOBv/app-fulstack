import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../querys'
import { withRouter } from 'react-router-dom'

import DatosCliente from './DatosCliente.jsx';
import ContentPedidos from './ContentPedidos.jsx';
import Spiner from '../layaut/Spiner.jsx';


export class NuevoPedido extends Component {
	render() {
		const { id } = this.props.match.params;
		const idVendedor = this.props.session.getUsuario.id;
		//console.log(idVendedor)
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Pedido</h1>
				<div className="row">
					<div className="col-md-3">
						<DatosCliente
							id={id}
						/>
					</div>
					<div className="col-md-9">
						<Query
							query={PRODUCTOS_QUERY} variables={{ stock: true }}>
							{({ loading, error, data, refetch }) => {
								if (loading) return <Spiner />;
								if (error) return `Error: ${error.message}`;

								//console.log(data)
								return (
									<ContentPedidos
										refetch={refetch}
										datas={data}
										id={id}
										idVendedor={idVendedor}
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

export default withRouter(NuevoPedido);