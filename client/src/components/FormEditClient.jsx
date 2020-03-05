import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ACTUALIZAR_CLIENTE } from "../mutations/index.js";
import { withRouter } from "react-router-dom";

class FormEditClient extends Component {
  state = {
    client: this.props.client,
    emails: this.props.client.emails
  };

  nuevoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  leerCampo = i => e => {
    const nuevoMail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return { ...email, email: e.target.value };
    });
    this.setState({ emails: nuevoMail });
  };

  quitarCampo = i => () => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  };

  render() {
    const { nombre, apellido, edad, empresa, tipo } = this.state.client;

    const { emails } = this.state;

    return (
      <Mutation
        mutation={ACTUALIZAR_CLIENTE}
        onCompleted={() =>
          this.props.refetch().then(() => {
            this.props.history.push("/");
          })
        }
      >
        {actualizarCliente => (
          <form
            className="col-md-8 m-3"
            onSubmit={e => {
              e.preventDefault();
              const {
                id,
                nombre,
                apellido,
                edad,
                empresa,
                tipo
              } = this.state.client;
              const { emails } = this.state;
              const input = {
                id,
                nombre,
                apellido,
                edad: Number(edad),
                empresa,
                tipo,
                emails
              };
              //console.log(input);

              actualizarCliente({
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
                  defaultValue={nombre}
                  onChange={e => {
                    this.setState({
                      client: {
                        ...this.state.client,
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
                  defaultValue={apellido}
                  onChange={e => {
                    this.setState({
                      client: {
                        ...this.state.client,
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
                  defaultValue={empresa}
                  onChange={e => {
                    this.setState({
                      client: {
                        ...this.state.client,
                        empresa: e.target.value
                      }
                    });
                  }}
                />
              </div>

              {emails.map((input, index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Email {index + 1} : </label>
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder={`Email`}
                      className="form-control"
                      onChange={this.leerCampo(index)}
                      defaultValue={input.email}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.quitarCampo(index)}
                      >
                        &times; Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button
                  onClick={this.nuevoCampo}
                  type="button"
                  className="btn btn-warning"
                >
                  + Agregar Email
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Edad</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={edad}
                  onChange={e => {
                    this.setState({
                      client: {
                        ...this.state.client,
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
                  defaultValue={tipo}
                  onChange={e => {
                    this.setState({
                      client: {
                        ...this.state.client,
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
              Guardar Cambios
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(FormEditClient);
