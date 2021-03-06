import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Resumen from './Resumen.jsx';
import AddPedido from './AddPedido';
import Error from '../alertas/Error.jsx';

export class ContentPedidos extends Component {

	state = {
		products: [],
		total: 0
	}

	selectProducto = (products) => {

		this.setState({
			products
		});

		//console.log(products);
	}

	actualizarTotal = () => {

		const products = this.state.products;

		if (products.length === 0) {
			this.setState({
				total: 0
			});
			return;
		}

		let newTotal = 0;

		products.map(product => newTotal += (product.cantidad * product.precio))

		this.setState({
			total: newTotal
		})

	}

	actualizarCant = (cantidad, index) => {

		const products = this.state.products;

		products[index].cantidad = Number(cantidad);

		this.setState({
			products
		}, () => {
			this.actualizarTotal();
		})

	}

	eliminarProducto = (id) => {
		//console.log(id)
		const products = this.state.products;

		const productsRes = products.filter(product => product.id !== id);

		this.setState({
			products: productsRes
		}, () => {
			this.actualizarTotal();
		})

	}

	render() {
		const op = this.props.datas.getProductos;

		const mensaje = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser menor a 0" /> : '';

		return (
			<Fragment>
				<h2 className="text-center mb-5">Seleccionar Articulos</h2>
				{mensaje}
				<Select
					onChange={this.selectProducto}
					options={op}
					isMulti={true}
					components={makeAnimated()}
					placeholder={"Seleccionar Productos"}
					getOptionValue={(options) => options.id}
					getOptionLabel={(options) => options.nombre}
					value={this.state.products}
				/>
				<Resumen
					productos={this.state.products}
					actualizarCant={this.actualizarCant}
					eliminarProducto={this.eliminarProducto}
				/>
				<p className="fotn-weight-bold float-right mt-3">
					Total:
					<span className="fotn-weight-normal">
						$ {this.state.total}
					</span>
				</p>
				<AddPedido
					products={this.state.products}
					total={this.state.total}
					idCliente={this.props.id}
					refetch={this.props.refetch}
					idVendedor={this.props.idVendedor}
				/>
			</Fragment>
		)
	}
}

export default ContentPedidos