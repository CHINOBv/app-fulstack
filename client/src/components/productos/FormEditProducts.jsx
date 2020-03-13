import React, { Component} from 'react';

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

    render() {

        const { nombre, precio, stock } = this.state;
        const input = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };
        console.log('grg')

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
    }
}

export default FormEditProducts;