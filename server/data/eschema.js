import { importSchema } from "graphql-import";

const typeDefs = `
type Cliente {
    id: ID
    nombre: String
    apellido: String
    empresa: String
    email: String
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
input EmailInput {
    email: String
}
enum TipoCliente {
    BASICO
    PREMIUM
}
type Query {
    getClientes(limite: Int): [Cliente]
    getCliente(id: ID) : Cliente

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
    email: String
    edad: Int
    tipo: TipoCliente
    pedidos: [PedidoInput]
}
type Mutation {
 crearCliente(input: ClienteInput)  : Cliente
 actualizarCliente(input: ClienteInput)  : Cliente
 eliminarCliente(id: ID!) : String
}
`;

export { typeDefs };
