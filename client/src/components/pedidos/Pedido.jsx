import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { PRODUCTO_QUERY } from '../../querys/index.js';
import { ACTUALIZAR_ESTADO } from '../../mutations';

import ResProducto from './ResProducto.jsx'
import Spiner from '../layaut/Spiner.jsx';

const Pedido = (props) => {
	
	const { pedido } = props;
	const { id } = pedido;
	const { estado } = pedido;
	const fecha = new Date ( Number(pedido.fecha) );
	//console.log(pedido)
	let clase;
	if (estado === 'PENDIENTE') {
		clase = 'border-warning';
	} else if(estado === 'CANCELADO'){
		clase = 'border-danger';
	}else{
		clase = 'border-success';
	}

	return (
		<div className="col-md-4">
		    <div className={`card mb-3 ${clase} shadow`}>
		        <div className="card-body">
		            <p className="card-text font-weight-bold ">Estado: 
	                    <Mutation mutation={ACTUALIZAR_ESTADO}>
	                    	{actualizarEstado =>(
		                    	<select 
			                    		className="form-control my-3"
			                    		value={pedido.estado}
			                    		onChange={ e => {
			                    			const input = {
			                    				id,
			                    				pedido: pedido.pedido,
			                    				fecha: pedido.fecha,
			                    				total: pedido.total,
			                    				cliente: props.cliente,
			                    				estado: e.target.value
			                    			}
						                    actualizarEstado({
						                    	variables: {input}
						                    });
			                    			//console.log(input)
		                    			}}
		                    		>
			                            <option value="PENDIENTE">PENDIENTE</option>
			                            <option value="COMPLETADO">COMPLETADO</option>
			                            <option value="CANCELADO">CANCELADO</option>
			                    </select>
		                    )}
	                    </Mutation>
		            </p> 
		            <p className="card-text font-weight-bold">Pedido ID:
		                <span className="font-weight-normal">{pedido.id}</span>
		            </p> 
		            <p className="card-text font-weight-bold">Fecha Pedido: 
		                <span className="font-weight-normal"> {fecha.toLocaleString("es-MX")}</span>
		            </p>
		            <p className="card-text font-weight-bold">Total: 
		                <span className="font-weight-normal">$ {pedido.total}</span>
		            </p>

		            <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
		            {pedido.pedido.map((product, index) => {
		            	const {id} = product;
						return(
							<Query key={pedido.id+index} query={PRODUCTO_QUERY} variables={{id}}  pollInterval={500}>
		            			{({ loading, error, data, startPolling, stopPolling }) => {
		            				if(loading) return <Spiner/>;
		            				if(error) return `Error: ${error.message}`;
		            				const producto = data.getProducto;
		            				console.log(producto.cantidad);
		            				return(
		            						<ResProducto
		            							key={producto.id}
												producto= {data.getProducto}
												cantidad= {product.cantidad}
		            						/>
	            					)
	            				}}
		            		</Query>	
						)
            		})}
		        </div>
		    </div>
		</div>
	);
}

export default Pedido