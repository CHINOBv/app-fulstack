import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../querys'

import Spiner from '../layaut/Spiner.jsx';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";

const Clients = () => {
	return (
		<Query query={ TOP_CLIENTES } pollInterval={500}>
			{({ loading, error, data, startPolling, stopPolling }) =>{
				if(loading) return <Spiner/>;
				if(error) return `Error: ${ error.message }`
				const topClientesGraf = [];
				data.topClientes.map(( pedido,index ) => {
					return (
					topClientesGraf[index] = {
						...pedido.cliente[0],
						total: pedido.total
					}
					)
				})
				//console.log(topClientesGraf)
				return (
			    	<BarChart width={600} height={300} data={topClientesGraf}
			            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				       <CartesianGrid strokeDasharray="3 3"/>
				       <XAxis dataKey="nombre"/>
				       <YAxis/>
				       <Tooltip/>
				       <Bar dataKey="total" fill="#82ca9d" />
			      </BarChart>
				)
			}}
		</Query>
	)
}

export default Clients