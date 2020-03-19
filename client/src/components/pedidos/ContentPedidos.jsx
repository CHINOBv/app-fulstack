import React,{ Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Resumen from './Resumen.jsx';

export class ContentPedidos extends Component {

	state={
		products: []
	}

	selectProducto = (products) =>{
		
		this.setState({
			products
		});

		//console.log(products);
	}

	actualizarCant = (cant, index) =>{
		const products = this.state.products;
		products[index].cant = Number(cant);

		console.log(products)

		this.setState({
			products
		})
	}

	render() {
		const op = this.props.datas.getProductos;
		return (
			<Fragment>
				<h2 className="text-center mb-5">Seleccionar Articulos</h2>
				<Select 
					onChange={this.selectProducto}
					options={op}
					isMulti={true}
					components={makeAnimated()}
					placeholder={"Seleccionar Productos"}
					getOptionValue={(options) => options.id}
					getOptionLabel={(options) => options.nombre}
				/>
				<Resumen
					productos={this.state.products}
					actualizarCant={this.actualizarCant}
				/>
			</Fragment>
		)
	}
}

export default ContentPedidos