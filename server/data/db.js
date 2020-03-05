import mongoose from "mongoose";

mongoose.Promise = global.Promise;

//Connect to DB
mongoose.connect("mongodb://localhost/clientes", { useNewUrlParser: true });
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

export { Clientes };
