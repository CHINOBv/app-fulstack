import React, { Component} from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { ACTUALIZAR_PRODUCTO } from '../../mutations/index.js';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''

};

class FormEditProducts extends Component {
    
    state={
        ...this.props.data.getProducto  
    }

    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    actualizarState = e =>{
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }

    validForm = () =>{
        const { nombre, precio, stock } = this.state;
        const noValid = !nombre.trim() || !precio || !stock;

        return noValid;
    }

    editarProductoForm = ( e, actualizarProducto ) =>{

        e.preventDefault();
        actualizarProducto().then(data =>{
            this.setState({
                ...initialState
            })
            this.props.refetch().then( ()=>
            this.props.history.push('/productos')
            )
        })
    }

    render() {

        const { nombre, precio, stock } = this.state;
        const { id } = this.props;
        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };


        return (
            <Mutation 
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{input}}
                key={id}
                
            >
            {( actualizarProducto, {loading, error, data} ) =>{

                //console.log(data)
                return (

                    <form 
                        className="col-md-8" 
                        onSubmit={ e => this.editarProductoForm( e, actualizarProducto)}
                        >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                autoComplete= "off"
                                value={nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={this.actualizarState}
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    value={ precio }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="stock del Producto" 
                                value={ stock }
                            />
                        </div>
                        <button 
                            disabled={ this.validForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form>
                );
            }}
            </Mutation>
        );
    }
}

export default withRouter(FormEditProducts);