import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { CREAR_USUARIO } from '../../mutations/index.js';

import Error from '../alertas/Error.jsx';

const initState = {
	usuario: '',
	password: '',
	repetirPassword: '',
	nombre: '',
	rol: '',
	error: ''
}

export class Registro extends React.Component {

	state = {
		...initState
	}

	actualizarState = e => {
		const { name, value } = e.target;

		//console.log(name, value)
		this.setState({
			[name]: value
		});
	}
	cleanState = () => {
		this.setState({
			...initState
		});
	}

	validForm = () => {
		const { usuario, password, repetirPassword, nombre, rol } = this.state;

		const noValid = !usuario || !password || !nombre || !rol || password !== repetirPassword;
		return noValid;
	}
	crearRegistro = (e, crearUsuario) => {
		e.preventDefault();
		//console.log("Creando Registro")

		crearUsuario().then(data => {
			//console.log(data)
			this.cleanState();
			this.props.history.push('/login');
		}).catch(error => {
			this.setState({
				error
			})
		})
	}

	render() {
		const { usuario, password, repetirPassword, nombre, rol, error } = this.state;
		const mensaje = error ? <Error error={error} /> : '';
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Usuario</h1>
				<div className="row  justify-content-center">
					<Mutation
						mutation={CREAR_USUARIO}
						variables={{ usuario, password, nombre, rol }}
					>
						{(crearUsuario, { loading, error, data }) => {
							return (

								<form
									className="col-md-8 mb-5"
									onSubmit={e => this.crearRegistro(e, crearUsuario)}
								>
									{mensaje}
									<div className="form-group">
										<label>Usuario</label>
										<input
											type="text"
											name="usuario"
											className="form-control"
											placeholder="Nombre Usuario"
											onChange={this.actualizarState}
											value={usuario}
										/>
										<small className="form-text text-muted">
											(Sin espacios y sin caracteres Especiales)
										</small>
									</div>
									<div className="form-group">
										<label>Nombre</label>
										<input
											type="text"
											name="nombre"
											className="form-control"
											placeholder="Nombre Completo"
											onChange={this.actualizarState}
											value={nombre}
										/>
										<small className="form-text text-muted">
											(Agreguar el Nombre y Apellidos Completos)
										</small>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label>Password</label>
											<input
												type="password"
												name="password"
												className="form-control"
												placeholder="Password"
												onChange={this.actualizarState}
												value={password}
											/>
										</div>
										<div className="form-group col-md-6">
											<label>Repetir Password</label>
											<input
												type="password"
												name="repetirPassword"
												className="form-control"
												placeholder="Repetir Password"
												onChange={this.actualizarState}
												value={repetirPassword}
											/>
									</div>
									<div className="form-group">
										<label> Rol: </label>
										<select
											className="form-control"
											value={rol}
											name="rol"
											onChange={this.actualizarState}
											>
											<option value="">Elegir...</option>
											<option value="ADMINISTRADOR">ADMINISTRADOR</option>
											<option value="VENDEDOR">VENDEDOR</option>
										</select>
									</div>
									</div>
									<button
										disabled={loading || this.validForm()}
										type="submit"
										className="btn btn-success float-right">
										Crear Usuario
					            </button>
								</form>
							)
						}}
					</Mutation>
				</div>
			</Fragment>
		)
	}
}

export default withRouter(Registro)