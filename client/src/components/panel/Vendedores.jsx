import React from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from '../../querys/index.js';

import Spiner from '../layaut/Spiner.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Vendedores = () => {
	return (
		<Query query={ TOP_VENDEDORES } pollInterval={500}>
			{({ loading, error, data, startPolling, stopPolling }) =>{
				if(loading) return <Spiner/>;
				if (error) return `Error: ${error.message}`;
				const topVendedoresGraph = [];
				data.topVendedores.map(( datas, index ) => {
					//console.log(index, datas);
					return(
				       topVendedoresGraph[index] = {
				       	...datas.vendedor[0],
				       	total: datas.total
				       }
			       	)
				});
				return (
					<BarChart width={600} height={300} data={topVendedoresGraph}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="nombre" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="total" fill="#30ca9c" />
					</BarChart>
		        )
			}}
		</Query>
	)
}

export default Vendedores