import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';

import { NUEVO_PRODUCTO } from '../../mutations/index.js';

class NuevoProducto extends Component {

    state={
        nombre: '',
        precio: '',
        stock: ''
    }

    actualizarState = e =>{
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }
    validForm = () =>{
        const { nombre, precio, stock } = this.state;
        const noValid = !nombre || !precio || !stock;

        return noValid;
    }

    crearProducto = ( e, NuevoProducto ) => {
        e.preventDefault();

    // Insert To Data Base
        NuevoProducto().then(data =>{
            console.log(data)
        });

    }

    render() {
    
        const { nombre, precio, stock } = this.state;
        const input = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };

        return (
            <Fragment>
                <h1 className="text-center">NuevoProducto</h1>
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={ NUEVO_PRODUCTO }
                        variables= {{input}}
                    >
                    {(NuevoProducto, { loading, error, data })=>{
                        return (
                            <form 
                                className="col-md-8"
                                onSubmit = { e => this.crearProducto( e, NuevoProducto ) }
                              >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        autocomplete= "off"
                                        onChange= {this.actualizarState}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input 
                                            type="number" 
                                            name="precio" 
                                            className="form-control" 
                                            placeholder="Precio del Producto"
                                            onChange= {this.actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        className="form-control" 
                                        placeholder="stock del Producto" 
                                        onChange= {this.actualizarState}
                                    />
                                </div>
                                <button 
                                    
                                    disabled= {this.validForm()}

                                    type="submit" 
                                    className="btn btn-success float-right">
                                        Crear Producto
                                </button>
                            </form>
                        );
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoProducto;