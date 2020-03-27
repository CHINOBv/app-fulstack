import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { CREAR_USUARIO } from '../../mutations/index.js';

import Error from '../alertas/Error.jsx';

const initState ={
	usuario: '',
	password: '',
	repetirPassword: '',
	error:''
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

	validForm = () =>{
		const { usuario, password, repetirPassword } = this.state;

		const noValid = !usuario || !password ||password !== repetirPassword;
		return noValid;
	}
	crearRegistro = (e, crearUsuario) => {
		e.preventDefault();
		console.log("Creando Registro")

		crearUsuario().then( data => {
			//console.log(data)
			this.cleanState();
		}).catch(error => {
			this.setState({
				error
			})
		})
	}

	render() {
		const { usuario, password, repetirPassword, error } = this.state;
		const mensaje = error ? <Error error={error}/>: '';
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Usuario</h1>
				<div className="row  justify-content-center">
					<Mutation
						mutation={CREAR_USUARIO}
						variables={{usuario, password}}
						>
						{(crearUsuario, { loading, error, data}) => {
					 		return (
						 
						    <form 
						        className="col-md-8"
						        onSubmit= {e => this.crearRegistro(e, crearUsuario)}
						    >
						    	{ mensaje }	
					            <div className="form-group">
					                <label>Usuario</label>
					                <input 
					                    type="text" 
					                    name="usuario" 
					                    className="form-control" 
					                    placeholder="Nombre Usuario" 
					                    onChange= {this.actualizarState}
					                    value={usuario}
					                />
					            </div>
					            <div className="form-group">
					                <label>Password</label>
					                <input 
					                    type="password" 
					                    name="password" 
					                    className="form-control" 
					                    placeholder="Password"
					                    onChange= {this.actualizarState}
					                    value={password}
					                />
					            </div>
					            <div className="form-group">
					                <label>Repetir Password</label>
					                <input 
					                    type="password" 
					                    name="repetirPassword" 
					                    className="form-control" 
					                    placeholder="Repetir Password" 
					                    onChange= {this.actualizarState}
					                    value={repetirPassword}
					                />
					            </div>

					            <button 
					            	disabled={this.validForm()}
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

export default Registro