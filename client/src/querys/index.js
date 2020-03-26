import gql from "graphql-tag";
export const CLIENTES_QUERY = gql`
  
    query getClientes ($limite: Int, $offset: Int) {
      getClientes(limite: $limite, offset: $offset){
        id
        nombre
        apellido
        empresa
      }
      totalClientes  
  }
`;

export const CLIENTE_QUERY = gql`
  query ConsultarCliente($id: ID) {
    getCliente(id: $id) {
      id
      nombre
      apellido
      emails{
        email
      }
      edad
      tipo
      empresa
    }
  }
`;

export const PRODUCTOS_QUERY = gql`

  query getProductos($limite: Int, $offset: Int, $stock: Boolean){
    getProductos(limite: $limite, offset: $offset, stock: $stock){
      id
      nombre
      precio
      stock
    }
    totalProductos
}
`;

export const PRODUCTO_QUERY = gql`

  query getProducto ($id: ID){
    getProducto(id: $id){
      id
      nombre
      precio
      stock
    }
  }

`;
