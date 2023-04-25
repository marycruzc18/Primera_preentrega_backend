module.exports= function CartManager(CartManager){
    this.productos = CartManager.productos || {}
    this.totalProductos = CartManager.totalproductos || 0
    this.totalPrice = CartManager.totalprice || 0

    this.add= function(producto,id){
        const CartProducto= this.productos[id]
        if(!CartProducto){
            CartProducto = this.productos[id] = {producto:producto, quantity:0, price:0}
    }

    CartProducto.quantity++ 
    CartProducto.price =  CartProducto.producto.price * CartProducto.quantity
    this.totalProductos++;
        this.totalPrice += CartProducto.producto.price;
    };


    this.getItems = function() {
        var arr = [];
        for (const id in this.productos) {
            arr.push(this.productos[id]);
        }
        return arr;
    };

}