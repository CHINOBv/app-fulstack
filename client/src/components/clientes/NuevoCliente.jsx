import React, { Component, Fragment } from "react";

import { NUEVO_CLIENTE } from "../../mutations/index.js";
import { Mutation } from "react-apollo";

class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: "",
      apellido: "",
      empresa: "",
      edad: "",
      email: "",
      tipo: ""
    },
    error: false,
    emails: []
  };

  NewCamp = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  DelCamp = i => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    });
  };

  ReadCamp = i => e => {
    const NewEmail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return {
        ...email,
        email: e.target.value
      };
    });

    this.setState({
      emails: NewEmail
    });
  };

  render() {
    const { error } = this.setState;
    let res = error ? (
      <p className="alert alert-danger p-3 text-center">
        Todos los campos son obligatorios
      </p>
    ) : (
      ""
    );
    return (
      <Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        <Mutation
          mutation={NUEVO_CLIENTE}
          onCompleted={() => {
            this.props.history.push("/");
          }}
        >
          {crearCliente => (
            <div className="justify-content-center d-flex">
              <form
                className="col-md-8 m-3 justify-content-center"
                onSubmit={e => {
                  e.preventDefault();

                  const {
                    nombre,
                    apellido,
                    empresa,
                    edad,
                    tipo
                  } = this.state.cliente;

                  const { emails } = this.state;

                  const input = {
                    nombre,
                    apellido,
                    empresa,
                    edad: Number(edad),
                    emails,
                    tipo
                  };

                  if (
                    nombre === "" ||
                    apellido === "" ||
                    empresa === "" ||
                    edad === "" ||
                    tipo === ""
                  ) {
                    this.setState({
                      error: true
                    });
                    return;
                  }
                  this.setState({
                    error: false
                  });

                  crearCliente({
                    variables: { input }
                  });
                }}
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            nombre: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            apellido: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Empresa"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            empresa: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  {this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12 ">
                      <label>Correo {index + 1}: </label>
                      <div className="input-group">
                        <input
                          type="email"
                          placeholder="Ingresa tu Email"
                          className="form-control"
                          onChange={this.ReadCamp(index)}
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.DelCamp(index)}
                          >
                            &times; Eliminar{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={this.NewCamp}
                    >
                      Agregar Email
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Edad</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Edad"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            edad: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Tipo Cliente</label>
                    <select
                      className="form-control"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            tipo: e.target.value
                          }
                        });
                      }}
                    >
                      <option value="">Elegir...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASICO">BÁSICO</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">
                  Agrgar Cliente
                </button>
              </form>
            </div>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default NuevoCliente;
