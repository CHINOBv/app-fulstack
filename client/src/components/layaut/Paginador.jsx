import React, { Component } from 'react';

class Paginador extends Component {

    state = {
        paginador: {
            paginas: Math.ceil(Number(this.props.total) / this.props.limite)
        }
    }


    render() {


        //BTN Anterior    -------------------------------------------------

        const { actual } = this.props;

        const btnAnterior = (actual > 1) ? <button
            className="btn btn-success mr-2"
            onClick={this.props.paginaAnt}
        > &laquo; Anterior </button> : '';

        //-----------------------------------------------------------------

        //btn Sig       -------------------------------------------

        const { paginas } = this.state.paginador;

        const btnSig = (actual !== paginas) ?

            <button className="btn btn-success ml-2" onClick={this.props.paginaSig}
            >   Siguiente &raquo; </button> : '';
        //-------------------------------------------------------------------


        return (
            <div
                className=" mt-5 d-flex justify-content-center mb-5 "
            >
                {btnAnterior}
                {btnSig}
            </div>
        );
    }
}

export default Paginador;
