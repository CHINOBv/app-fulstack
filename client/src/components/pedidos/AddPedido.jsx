import React from 'react'
import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations/index.js'
import { withRouter } from 'react-router-dom'

const validPedido = (props) => {
	let noValid = !props.products || props.total <= 0;
	return noValid;
}

function AddPedido(props) {
	//console.log(props.idVendedor)
	return (
		<Mutation
			mutation={NUEVO_PEDIDO}
			onCompleted={() => props.refetch().then(() => props.history.push('/clientes'))}>
			{nuevoPedido => (
				<button
					disabled={validPedido(props)}
					type="button"
					className="btn btn-warning mt-4"
					onClick={e => {
						const productosInput = props.products.map(({ nombre, precio, stock, ...objeto }) => objeto);

						const input = {
							pedido: productosInput,
							total: props.total,
							cliente: props.idCliente,
							vendedor: props.idVendedor
						};

						nuevoPedido({
							variables: { input }
						});

					}}
				>
					Generar Pedido
				</button>
			)}
		</Mutation>
	)
}

export default withRouter(AddPedido);