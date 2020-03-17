import { importSchema } from "graphql-import";
import gql from 'graphql-tag';

const typeDefs = gql`

""" Clientes Querys """
type Cliente {
    id: ID
    nombre: String
    apellido: String
    empresa: String
    emails: [Email]
    edad: Int
    tipo: TipoCliente
    pedidos: [Pedido]
}
type Pedido {
    producto: String
    precio: Int
}
type Email {
    email: String
}

enum TipoCliente {
    BASICO
    PREMIUM
}

""" Producto Types """
type getProducto {
    nombre: String
    precio: Int
    stock: Int
}

type Query {
    getClientes(limite: Int, offset: Int): [Cliente]
    getCliente(id: ID) : Cliente
    totalClientes: String
    # Producto Querys
    getProductos(limite: Int, offset: Int): [Producto]
    getProducto(id:ID): Producto
    totalProductos: String
}

type Producto{
    id: ID
    nombre: String!
    precio: Int!
    stock: Int!
}

""" Clientes Inputs """
input EmailInput {
    email: String
}
input PedidoInput{
    producto: String
    precio: Int
}
input ClienteInput{
    id: ID
    nombre: String!
    apellido: String!
    empresa: String!
    emails: [EmailInput]
    edad: Int
    tipo: TipoCliente
    pedidos: [PedidoInput]
}

"""Producto Input"""
input ProductoInput{
    id: ID
    nombre: String!
    precio: Int!
    stock: Int!
}

type Mutation {
    # Mutations Client
 crearCliente(input: ClienteInput)  : Cliente
 actualizarCliente(input: ClienteInput)  : Cliente
 eliminarCliente(id: ID!) : String
    # Mutations Producto
nuevoProducto(input: ProductoInput): Producto
actualizarProducto(input: ProductoInput): Producto
eliminarProducto(id:ID): String 
}

`;

export { typeDefs };
