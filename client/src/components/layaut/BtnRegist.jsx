import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const BtnRegist = ({session}) => {
	//console.log(session)
	//Verificar que exista getUsuario
	let rol;
	if (session.getUsuario) {
		//Get Rol
		rol = session.getUsuario.rol;
	} else {
		this.props.history.push('/login');
	}

	//Verifica si es Admin
	if (rol !== "ADMINISTRADOR") return null;

	return (
		<div>
			<Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0 d-block"> Registrar </Link>
		</div>
	)
}

export default withRouter(BtnRegist);