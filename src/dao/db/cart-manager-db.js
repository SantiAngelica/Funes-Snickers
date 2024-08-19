
import CartsModel from "../models/carts.model.js"
import mongoose from "mongoose"



class CartManager{
    async getCarts(){
        try {
            let res = await CartsModel.find()
            return res
        } catch (error) {
            return error
        }
    }
    async newCart(){
        try {
            const newCart = new CartsModel({products: []})
            await newCart.save()
            return newCart
        } catch (error) {
            console.log(error)
            return false
        }
        
    }
    async getCartById(id){
        try {
            const cart = CartsModel.findById(id)
            if(!cart){
                console.log("Carrito no encontrado")
                return false
            }
            return cart
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async addProdToCart(cid, pid, quantity){
        try {
            const cart = await this.getCartById(cid)
            
            const cartExist = cart.products.find(prod => prod.product._id.toString() == pid)
            if(cartExist){
    
                cartExist.quantity += Number(quantity)
            }else{
                cart.products.push({product: pid, quantity: quantity})
            }
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("error al agregar producto")
            return false
        }
    }
    async deleteAllProds(cid){
        try {
            const cart = await this.getCartById(cid)
            if(!cart){
                console.log("carrito no encontrado")
                return false
            }
            cart.products = []
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("error al eliminar los productos del carrito", error)
            return false
        }

    }
    async deleteOneProd(cid, pid){
        try {
            const cart = await this.getCartById(cid)
            if(!cart){
                console.log("carrito no encontrado")
                return false
            } 
            
            const index = cart.products.findIndex(item => item.product._id == pid)
        
            if(index<0){
                console.log("producto no encontrado")
                return false
            }
            
            cart.products.splice(index, 1)
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("error al eliminar un producto del carrito")
            return false
        }
    }
    async updateProducts(cid, products){
        try {
            const cart = await this.getCartById(cid)
            if(!cart){
                console.log("carrito no encontrado")
                return false
            }
    
            const formatedProducts = products.map(product => ({
                product: new  mongoose.Types.ObjectId(product.product),
                quantity: product.quantity
            }))
             await CartsModel.findByIdAndUpdate(
                cid, 
                {products : formatedProducts} , 
            );
            const updatecart = await this.getCartById(cid)
    

            return updatecart
        } catch (error) {
            console.log("error al actualizar los productos", error)
            return false
        }
    }
    async updateQuantity(cid,pid,quantity){
        try {
            const cart = await this.getCartById(cid)
            if(!cart){
                console.log("carrito no encontrado")
                return false
            }
       
            const prod = cart.products.find(prod => prod.product._id.toString() == pid)
            if(!prod){
                console.log("producto no encontrado")
                return false
            }
            
            prod.quantity = quantity.quantity
            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log("error al actualizar cantidad")
            return false
        }
    }
}

export default CartManager