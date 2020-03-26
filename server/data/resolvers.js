import mongoose from "mongoose";
import { Clientes, Productos, Pedidos } from "./db.js";

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
    totalClientes: (root) =>{
      return new Promise((resolve, object) => {
        Clientes.countDocuments({}, (error, count) => {
          if(error) rejects(error);
          else resolve(count)
        })
      })
    },
    getProductos: (root, { limite, offset, stock })=>{
      let filtro;
      if(stock){
        filtro = { stock: {$gt: 0} }
      }
      return Productos.find(filtro).limit(limite).skip(offset);
    },
    getProducto: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findById(id, (error, Producto) => {
          if(error) rejects(error);
          else resolve(Producto);
        });
      });
    },
    totalProductos: (root) =>{
      return new Promise((resolve, object) => {
        Productos.countDocuments({}, (error, count) => {
          if(error) rejects(error);
          else resolve(count)
        })
      })
    },
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
    nuevoProducto: (root,{ input }) => {
      const nuevoProducto = new Productos({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      });
      
      nuevoProducto.id = nuevoProducto._id;

      return new Promise((resolve, object) => {
        nuevoProducto.save((error) => {
          if(error) rejects(error);
          else resolve(nuevoProducto);
        });
      });
    },
    actualizarProducto: (root, { input }) =>{
      return new Promise( ( resolve, Producto ) => {
        Productos.findOneAndUpdate(
          {_id: input.id},
          input,
          {new: true},
          (error, Producto) =>{
            if (error) {
              rejects(error);
            }else {
              resolve(Producto);
            }
          }
          );
      });
    },
    
    eliminarProducto: (root, {id}) => {
      return new Promise(( resolve, object ) => {
        Productos.findOneAndDelete({ _id: id }, error => {
          if(error) rejects(error);
          else resolve(" Se Ha Eliminado el Producto ");
        });
      });
    },
    nuevoPedido: (root, {input}) => {
      const nuevoPedido = new Pedidos({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: "PENDIENTE"
      });
      nuevoPedido.id = nuevoPedido._id;
      return new Promise( ( resolve, object ) => {
      //Actualizar la cantidad de Productos
        input.pedido.forEach(pedido => {
          Productos.updateOne({ _id: pedido.id },
            {
            "$inc":{ "stock": -pedido.cantidad }
            }, function (error) {
              if(error) return new Error(error)
            }
          );
        });
        nuevoPedido.save(( error ) => {
          if (error) rejects(error)
            else resolve(nuevoPedido)
        });
      });
    }
  }
};
