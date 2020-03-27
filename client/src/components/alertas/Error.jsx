import React from 'react'

const Error = ( { error } ) => {

	return (
		<p className="alert alert-danger py-3 text-center mb-4">{ error?.message }</p>
	)
}

export default Error