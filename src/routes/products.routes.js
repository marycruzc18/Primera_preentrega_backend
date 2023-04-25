const fs= require ('fs')
const express = require('express');
const ProductManager= require ('../ProductManager')

const AgregarProduct = './carrito.json'


const router = express.Router();

const  ArchivoProductos= './productos.json'

const productos=[];






router.post('/api/products', (req, res) => {
  
const body= req.body
  const nuevoProduct = {

    id:ArchivoProductos.length +1,
    title: body.title,
    description: body.description,
    price:body.price,
    thumbnail: body.thumbnail,
    code: body.code,
    stock: body.stock,
    status: body.status,
    category:body.category
  };



  productos.push(nuevoProduct)
  fs.writeFile(ArchivoProductos, JSON.stringify(body, null, 2), (error) =>{
    if(error) throw error;
    res.status(200).send({mensaje:'Se guardo Archivo'})
  })
 


})



router.get('/api/products', async (req, res) => {
    try{
        const datos = await fs.promises.readFile(ArchivoProductos,'utf-8' );
        const products= JSON.parse(datos);
        const limit = parseInt(req.query.limit)
        if(limit){
            res.send(products.slice(0,limit))
            return
        }else{
            
          res.status(200).send(products);
        }

      }catch(error){
        res.status(404).send({ mensaje: 'Producto no existe' });
        return;
      }
    
    });
    router.get('/api/products/:pid', async (req, res) => {
      try {
          const products = await fs.promises.readFile(ArchivoProductos, 'utf-8');
          const productsJson = await JSON.parse(products);
          const product = productsJson.find(product => product.id === parseInt(req.params.pid));
          if (product) {
              res.status(200).send(product);
          } else {
              res.status(404).send({ mensaje: 'ERROR: No hay producto con ese id, no existe' });
          }
      } catch(err) {
  
          res.status(500).send(err);
      }
  });


  router.put('/api/products/:pid', async (req, res) => {
    const products = await fs.promises.readFile(ArchivoProductos,'utf-8' );
    const productsJson = await JSON.parse(products);
    const nuevaData=  productsJson.find(product =>product.id === parseInt(req.params.pid))
    if(!nuevaData){
      res.status(404).send({mensaje:"No se encontro producto"});
    }
    productsJson.map(product =>product.id === parseInt(req.params.pid) ? {...product, ...nuevaData }: product)
    res.status(200).send({mensaje:'Producto Actualizado' });
});



 
  
router.delete('/api/products/:pid', async (req, res) => {
 
    const products = await fs.promises.readFile(ArchivoProductos,'utf-8' );
    const productsJson = await JSON.parse(products);
  
    const borrarItem = productsJson.find(product =>product.id === parseInt(req.params.pid))
  
    if(!borrarItem){
      res.status(404).send({mensaje:"No se encontro producto con ese ID"});
      
    }
    const borrarItemConFilter = productsJson.filter(product =>product.id != parseInt(req.params.pid))
    fs.writeFile(ArchivoProductos, JSON.stringify(borrarItemConFilter), error =>{
      if(error) throw error;
      res.status(404).send({mensaje:"El producto fue eliminado"});
  
      
    })
  
  
})

router.post('/api/carts',async (req, res) => {  
  const body= req.body
  const nuevoProductC = {

    id:AgregarProduct.length +1,
    title: body.title,
    price:body.price,
    quantity:body.quantity
  };




  productos.push(nuevoProductC)
  fs.writeFile(AgregarProduct, JSON.stringify(body, null, 2), (error) =>{
    if(error) throw error;
    res.status(200).send({mensaje:'Se guardo Archivo'})
  })
  
});


router.get('/api/carts/:pid', async (req, res) => {
  try {
      const products = await fs.promises.readFile(AgregarProduct, 'utf-8');
      const productsJson = await JSON.parse(products);
      const product = productsJson.find(product => product.id === parseInt(req.params.pid));
      if (product) {
          res.status(200).send(product);
      } else {
          res.status(404).send({ mensaje: 'ERROR: No hay producto, no existe' });
      }
  } catch(err) {

      res.status(500).send(err);
  }
});


    module.exports = router;
  
  
