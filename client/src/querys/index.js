import gql from "graphql-tag";
export const CLIENTES_QUERY = gql`
  
    query getClientes ($limite: Int, $offset: Int, $vendedor: String) {
      getClientes(limite: $limite, offset: $offset, vendedor: $vendedor){
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

export const PEDIDOS_QUERY = gql`

  query getPedidos($cliente: String){
    getPedidos(cliente: $cliente){
      id
      pedido{
        id
        cantidad
      }
      total
      fecha
      cliente
      estado
    }
  }
`;
//Graficas
export const TOP_CLIENTES = gql`
  query topClientes{
    topClientes{
      total
      cliente {
        nombre
      }
    }
  }

`;

export const USUARIO_ACTUAL = gql`
  
  query getUsuario {
    getUsuario{
      id
      usuario
      nombre
      rol
    }
  }

`;

export const TOP_VENDEDORES = gql`
  query topVendedores {
    topVendedores{
      total
      vendedor{
        nombre
        usuario
        rol
      }
    }
  }
`;