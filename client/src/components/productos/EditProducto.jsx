import React, { Component} from 'react';

class EditProducto extends Component {


    render() {
        return (
                <form 
                    className="col-md-8" >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.actualizarState}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
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
                            />
                        </div>
                        <button 
                            disabled={ this.validarForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form>
        );
    }
}

export default EditProducto;
