const express = require ('express')
const router = require('./routes/products.routes');
const PORT = 8080;

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.use(router);


server.listen(PORT, ()=>{
    console.log( `Servidor corriendo en el puerto ${PORT}`);
});


