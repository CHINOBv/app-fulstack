import React, { Component, Fragment} from 'react';

import { PRODUCTO_QUERY } from '../../querys/index.js';
import { Query } from 'react-apollo';

import FormEditProducts from './FormEditProducts.jsx';

class EditProducto extends Component {


    render() {
        
        const {id} = this.props.match.params;

        return (
            <Fragment>
               <h1 className="text-center">Editar Producto</h1>
               <div className= "row justify-content-center">
                   <Query 
                    query={ PRODUCTO_QUERY } 
                    variables= {{ id }}>
                       {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error: ${error.message}`;
                            return(
                                <FormEditProducts 
                                    data= {data}
                                    refetch= {refetch} 
                                    id= { id }/>
                                );
                       }}
                   </Query>
               </div>
            </Fragment>
        );
    }
}

export default EditProducto;
