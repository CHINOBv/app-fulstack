import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { PEDIDOS_QUERY } from '../../querys/index.js';

import Spiner from '../layaut/Spiner.jsx';
import Pedido from './Pedido.jsx';

const PedidosClient = (props) => {
	const cliente = props.match.params.id;
	//console.log(idCliente)
	return (
		<Fragment>
			<h2 className="text-center mb-5">Pedidos</h2>
			<div className="row">
				<Query query={PEDIDOS_QUERY} pollInterval={500} variables={{ cliente }}>
					{({ loading, error, data, startPolling, stopPolling, refetch }) => {
						if (loading) return (<Spiner />);
						if (error) return `Error: ${error.message}`;
						//console.log(data);

						return (
							data.getPedidos.map(pedido => (
								<Pedido
									key={pedido.id}
									pedido={pedido}
									cliente={cliente}
									refetch={refetch}
								/>
							))
						);
					}}
				</Query>
			</div>
		</Fragment>
	)
}

export default PedidosClient