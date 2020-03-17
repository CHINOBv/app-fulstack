import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { CLIENTE_QUERY } from '../../querys/index.js'
function DatosCliente({ id }) {
	return (
		<Fragment>
			<h2 className="mb-3 text-center">Data</h2>
			<Query 
				query={ CLIENTE_QUERY } 
				variables={{id}}
				pollInterval={500}>
				{({loading,error,data, startPolling, stopPolling}) => {
						if(loading) return "Cargando...";
						if(error) return`Error: ${error.message}`;
						const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente;
						
						return(
							<ul className="list-unstyled my-5 list-group">
								<li className="border font-weight-bold p-2 list-group-item">Nombre: 
									<span className="font-weight-normal">{nombre}</span>
								</li>
								<li className="border font-weight-bold p-2 list-group-item"> Apellido: 
									<span className="font-weight-normal">{apellido}</span>
								</li>
								<li className="border font-weight-bold p-2 list-group-item"> Edad: 
									<span className="font-weight-normal">{edad}</span>
								</li>
								<li className="border font-weight-bold p-2 list-group-item">
									<button 
										type="button" 
										className="btn btn-primary d-block d-md-inline-block mr-2 text-center" 
										data-toggle="modal" 
										data-target="#VerEmails">
										Ver Emails
									</button>

									<div className="modal fade" id="VerEmails" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
									  <div className="modal-dialog modal-dialog-scrollable" role="document">
									    <div className="modal-content">
									      <div className="modal-header">
									        <h5 className="modal-title" id="exampleModalScrollableTitle">Emails de: {nombre}</h5>
									        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
									          <span aria-hidden="true">&times;</span>
									        </button>
									      </div>
									      <div className="modal-body">
									        {emails.map(email => <h5>{email.email}</h5>)}
									      </div>
									      <div className="modal-footer">
									        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									      </div>
									    </div>
									  </div>
									</div>
								</li>
								<li className="border font-weight-bold p-2 list-group-item"> Empresa: 
									<span className="font-weight-normal">{empresa}</span>
								</li>
								<li className="border font-weight-bold p-2 list-group-item"> tipo: 
									<span className="font-weight-normal">{tipo}</span>
								</li>
							</ul>
							);
					}}
			</Query>
		</Fragment>
	)
}

export default DatosCliente