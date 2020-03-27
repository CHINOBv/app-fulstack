import React, { Fragment } from 'react';
import Producto from './Producto.jsx';

function Resumen(props) {
	const productos = props.productos;
	if (!productos?.length) return null;
	return (
		<Fragment>
			<h1 className="text-center mb-5 mt-5">Resumen</h1>
			<table className="table">
				<thead className="bg-success text-light">
					<tr className="font-weight-bold">
						<th>Producto</th>
						<th>Precio</th>
						<th>Inventario</th>
						<th>Cantidad</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{productos.map((producto, index) => (
						<Producto
							key={producto.id}
							id={producto.id}
							producto={producto}
							index={index}
							actualizarCant={props.actualizarCant}
							eliminarProducto={props.eliminarProducto}
						/>
					))}
				</tbody>
			</table>
		</Fragment>
	)
}

export default Resumen