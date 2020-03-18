import React, { Fragment } from 'react'

export class Producto extends React.Component {
	render() {
		const {producto} = this.props;
		return (
			<Fragment>
				<tr>
					<td>{producto.nombre}</td>
					<td>{producto.precio}</td>
					<td>{producto.stock}</td>
					<td>
						<input
							type="number"
							className="form-control"
						/>
					</td>
					<td>
						<button
							type="button"
							className="btn btn-danger font-weight-bold"
							>&times; Eliminar</button>
					</td>
				</tr>
			</Fragment>
		)
	}
}

export default Producto