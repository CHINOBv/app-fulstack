import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
  //ObjectID se usa para Relacionar una DB con otra
  cliente: mongoose.Types.ObjectId,
  estado: String

});
const Pedidos = mongoose.model('pedidos', predidosSchema);

//Usuarios
const usuariosSchema = new mongoose.Schema({
  usuario: String,
  password: String
});
//hash passwords
usuariosSchema.pre('save', function(next) {
  //si tiene hash no hash xd
  if(!this.isModified('password')){
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
          if(err) return next(err);
          this.password = hash;
          next();
    });
  });
})

const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Productos, Pedidos, Usuarios };
