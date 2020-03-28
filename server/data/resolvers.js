import mongoose from "mongoose";
import { Clientes, Productos, Pedidos, Usuarios } from "./db.js";
import bcrypt from 'bcrypt';

//Generate Token
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

import jwt from 'jsonwebtoken';

const createToken = ( usuarioLogin, secreto, expiresIn ) => {
  const {usuario} = usuarioLogin;

  return jwt.sign( {usuario}, secreto, {expiresIn} );
}

//Export Resolvs
export const resolvers = {
  Query: {
    //Get all Clients from DB
    getClientes: (root, { limite, offset }) => {
      return Clientes.find({}).limit(limite).skip(offset)
    },
    //Get A Client By Id from DB
    getCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (error, Cliente) => {
          if (error) rejects(error);
          else resolve(Cliente);
        });
      });
    },
    totalClientes: (root) => {
      return new Promise((resolve, object) => {
        Clientes.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count)
        })
      })
    },
    getProductos: (root, { limite, offset, stock }) => {
      let filtro;
      if (stock) {
        filtro = { stock: { $gt: 0 } }
      }
      return Productos.find(filtro).limit(limite).skip(offset);
    },
    getProducto: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findById(id, (error, Producto) => {
          if (error) rejects(error);
          else resolve(Producto);
        });
      });
    },
    totalProductos: (root) => {
      return new Promise((resolve, object) => {
        Productos.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count)
        })
      })
    },
    getPedidos: (root, { cliente }) => {
      return new Promise((resolve, object) => {
        Pedidos.find({ cliente: cliente }, (error, pedido) => {
          if (error) rejects(error);
          else resolve(pedido)
        })
      })
    },
    topClientes: (root) => {
      return new Promise((resolve, object) => {
        Pedidos.aggregate([
          {
            $match: {
              estado: "COMPLETADO"
            }
          },
          {
            $group: {
              _id: "$cliente",
              total: { $sum: "$total" }
            }
          },
          {
            $lookup: {
              from: "clientes",
              localField: "_id",
              foreignField: "_id",
              as: "cliente"
            }
          },
          {
            $sort: {
              total: -1
            }
          },
          {
            $limit: 10
          }
        ], (error, res) => {
          if (error) rejects(error);
          else resolve(res);
        })
      });
    },
    getUsuario: ( root, args, {usuarioActual} ) => {
      if (!usuarioActual) {
        return null;
      }
      console.log(usuarioActual)
        //Get User of Req Verified
      const usuario = Usuarios.findOne({ usuario: usuarioActual.usuario});

      return usuario;
    }
  },

  Mutation: {
    //Create a Client
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        id: input.id,
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      });

      nuevoCliente.id = nuevoCliente._id;

      return new Promise((resolve, object) => {
        nuevoCliente.save(error => {
          if (error) rejects(error);
          else resolve(nuevoCliente);
        });
      });
    },
    //Update A Client Info
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, Cliente) => {
            if (error) rejects(error);
            else resolve(Cliente);
          }
        );
      });
    },
    //Remove Client from DB
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve("Se Elimino el Cliente");
        });
      });
    },
    nuevoProducto: (root, { input }) => {
      const nuevoProducto = new Productos({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      });

      nuevoProducto.id = nuevoProducto._id;

      return new Promise((resolve, object) => {
        nuevoProducto.save((error) => {
          if (error) rejects(error);
          else resolve(nuevoProducto);
        });
      });
    },
    actualizarProducto: (root, { input }) => {
      return new Promise((resolve, Producto) => {
        Productos.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, Producto) => {
            if (error) {
              rejects(error);
            } else {
              resolve(Producto);
            }
          }
        );
      });
    },

    eliminarProducto: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve(" Se Ha Eliminado el Producto ");
        });
      });
    },
    nuevoPedido: (root, { input }) => {
      const nuevoPedido = new Pedidos({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: "PENDIENTE"
      });
      nuevoPedido.id = nuevoPedido._id;
      return new Promise((resolve, object) => {
        nuevoPedido.save((error) => {
          if (error) rejects(error)
          else resolve(nuevoPedido)
        });
      });
    },
    actualizarEstado: (root, { input }) => {
      return new Promise((resolve, object) => {
        input.pedido.forEach(pedido => {
          const { estado } = input;
          let instruccion;
          if (estado === "COMPLETADO") {
            instruccion = '-'
          } else if (estado === "CANCELADO") {
            instruccion = '+';
          }
          Productos.updateOne({ _id: pedido.id },
            {
              "$inc": { "stock": `${instruccion}${pedido.cantidad}` }
            }, function (error) {
              if (error) return new Error(error)
            }
          );
        });
        Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error) => {
          if (error) rejects(error);
          else resolve("Se actualizo Correctamente");
        });
      });
    },
    crearUsuario: async (root, { usuario, password }) => {
      const exsitUser = await Usuarios.findOne({ usuario });
      if (exsitUser) {
        throw new Error('El usuario ya existe');
      }
      const nuevoUsuario = await new Usuarios({
        usuario,
        password
      }).save();
      return "Creado Correctamente";
    },
    autenticarUsuario: async( root, { usuario, password } ) => {
      const nombreUsuario = await Usuarios.findOne({usuario});

      if(!nombreUsuario){
        throw new Error('El Usuario No Existe');
      }

      const passwordCorrect = await bcrypt.compare( password, nombreUsuario.password );

      if(!passwordCorrect){
        throw new Error("Password Incorrecto");
      }

      return {
        token: createToken( nombreUsuario, process.env.SECRETO, "24hr" )
      }

    }
  }
};
