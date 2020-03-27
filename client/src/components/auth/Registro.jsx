import React, { Fragment } from 'react';
const initState ={
	usuario: '',
	password: '',
	repetirPassword: ''
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

	validForm = () =>{

	}

	render() {
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Usuario</h1>
				<div className="row  justify-content-center">
				    <form 
				        className="col-md-8"
				    >
			            <div className="form-group">
			                <label>Usuario</label>
			                <input 
			                    type="text" 
			                    name="usuario" 
			                    className="form-control" 
			                    placeholder="Nombre Usuario" 
			                    onChange= {this.actualizarState}
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
			                />
			            </div>

			            <button 
			            	disabled={this.validForm()}
			                type="submit" 
			                className="btn btn-success float-right">
			                    Crear Usuario
			            </button>
					</form>
				</div>
			</Fragment>
		)
	}
}

export default Registro