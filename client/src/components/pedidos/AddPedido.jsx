import React, { Fragment } from 'react'

const validPedido = (props) => {
	let noValid = !props.products || props.total === 0;
	return noValid;
}

function AddPedido(props) {
	return (
		<Fragment>
			<button
				disabled= { validPedido(props) }
				type="button"
				className="btn btn-warning mt-4">
				Generar Pedido	
			</button>
		</Fragment>
	)
}

export default AddPedido