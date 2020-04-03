import React, { Fragment } from 'react'
import Clients from './Clients.jsx';
import Vendedores from './Vendedores.jsx'

const Panel = () => {
	return (
		<Fragment>
			<div className="justify-content-center text-center">
				<h1>Top 10 Clients Que Mas Compran</h1>
				<Clients className="mb-6"/>
				<h1>Top 10 Vendedores Que Mas Venden</h1>
				<Vendedores/>
			</div>
		</Fragment>
	)
}

export default Panel