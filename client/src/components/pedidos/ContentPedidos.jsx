import React,{ Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
			</Fragment>
		)
	}
}

export default ContentPedidos