const fs= require ('fs')
const express = require('express');
const ProductManager= require ('../ProductManager')


const router = express.Router();


const  ArchivoProductos= './productos.json'

router.post('/api/products', (req, res) => {
  const { id,title,description,price,thumbnail,code,stock,status,category  } = req.body;
 
  fs.writeFile(ArchivoProductos, JSON.stringify(req.body, null, 2), (error) =>{
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
    try {
      const { id, indice, campo } = req.body;
      await ArchivoProductos.updateProduct(id, indice, campo);
  
      if (ArchivoProductos === -1) {
          res.status(200).send({mensaje:' Producto Actualizado' });
      } else {
          res.status(400).send({mensaje:' Error' });
      }
  } catch (err) {
      res.status(500).send({mensaje: 'Error' });
  }
});



 
  
router.delete('/api/products/:pid', async (req, res) => {
 
    const products = await fs.promises.readFile(ArchivoProductos,'utf-8' );
    const productsJson = await JSON.parse(products);
  
    const borrarItemConFilter = productsJson.filter(product =>product.id != parseInt(req.params.pid))
  
    if(req.params.pid <= borrarItemConFilter.length  ){
      return (`No se encontro producto con ese ID`)
      
    }
  
    fs.writeFile(ArchivoProductos, JSON.stringify(borrarItemConFilter), error =>{
      if(error) throw error;
      res.status(404).send({mensaje:"El producto fue eliminado"});
  
      
    })
  
  
})




    module.exports = router;
  
  
