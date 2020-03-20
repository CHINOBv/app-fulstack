import mongoose from "mongoose";

mongoose.Promise = global.Promise;

//Connect to DB
mongoose.connect("mongodb://localhost/clientes", { 
  useNewUrlParser: true ,
  useCreateIndex: true
});
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

//Create DB
const clientesSchema = new mongoose.Schema({
  //Schema Def Type Data
  nombre: String,
  apellido: String,
  empresa: String,
  emails: Array,
  edad: Number,
  tipo: String,
  pedidos: Array
});

const Clientes = mongoose.model("clientes", clientesSchema);

const productosSchema = new mongoose.Schema({
	
	nombre: String,
	precio: Number,
	stock: Number

});

const Productos = mongoose.model('productos', productosSchema);

const predidosSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: String,
  estado: String

});
const Pedidos = mongoose.model('pedidos', predidosSchema);

export { Clientes, Productos, Pedidos };
