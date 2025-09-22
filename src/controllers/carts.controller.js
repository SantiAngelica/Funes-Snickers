import { CartServices } from "../services/index.services.js";
import UserServices from "../services/user.services.js";
import TicketServices from "../services/ticket.services.js";
import ProductsService from "../services/products.service.js";
import { checkStock } from "../utils/ticket.utils.js";
import { respuesta } from "../utils/reutilizable.js";

class CartController {

    async createCart(req, res) {
        try {
            const cart = await CartServices.createCart()
            if (!cart) throw new Error()
            respuesta(res, 201, cart)
        } catch (error) {
            console.log(error)
            respuesta(res, 500, "Error al intentar crear el carrito")
        }

    }

    async addProdToCart(req, res) {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = req.params.qty
        try {
            const cart = await CartServices.getCarts(cid)
            if (!cart) throw new Error()
            const prodExists = cart.products.find(prod => prod._id.toString() == pid)
            if (prodExists) {
                prodExists.quantity += quantity
            } else {
                cart.products.push({ product: pid, quantity: quantity })
            }
            await CartServices.saveCart(cart)
            respuesta(res, 200, "producto agregado al carrito!")
        } catch (error) {
            respuesta(res, 404, "Carrito no encontrado :(" )
        }
    }

    async getCartById(req, res) {
        let cid = req.params.cid
        try {
            const cart = await CartServices.getCarts(cid)
            if (!cart) throw new Error()
            respuesta(res, 200, cart.products)
        } catch (error) {
            respuesta(res, 404, "Carrito no encontrado :(")
        }

    }

    async deleteOneProd(req, res) {
        const pid = req.params.pid
        const cid = req.params.cid
        try {
            const cart = await CartServices.getCarts(cid)
            if (!cart) throw new Error()
            const index = cart.products.findIndex(item => item.product._id.toString() == pid)
            if (index < 0) throw new Error()

            cart.products.splice(index, 1)
            await CartServices.saveCart(cart)
            respuesta(res, 200, "Producto eliminado")
        } catch (error) {
            respuesta(res, 500, "error al eliminar producto")
        }
    }

    async deleteAllProducts(req, res){
        const cid = req.params.cid
        try {
            const cart = await CartServices.getCarts(cid)
            if(!cart) throw new Error()
            cart.products = []
            await CartServices.saveCart(cart)
            respuesta(res, 200, "productos del carrito eliminados correctamente")
        } catch (error) {
            console.log(error)
            respuesta(res, 500, "error al eliminar los productos del carrito")
        }
    }

    async updateAllProducts(req, res) {
        const cid = req.params.cid
        const products = req.body
        try {
            const cart = await CartServices.getCarts(cid)
            if (!cart) throw new Error()
            const formatedProducts = products.map(product => ({
                product: new mongoose.Types.ObjectId(product.product),
                quantity: product.quantity
            }))
            const updateCart = await CartServices.updateAll(cid, {products: formatedProducts})
            respuesta(res, 200, 'Carrito acutalizado correctamente!')
        } catch (error) {
            respuesta(res, 500, 'error al actualizar los productos')
        }
    }

    async updateQuantity(req, res) {
        const quantity = req.body
        const cid = req.params.cid
        const pid = req.params.pid
        try {
            const cart = await CartServices.getCarts(cid)
            if(!cart) throw new Error()
            const prod = cart.products.find(prod => prod.product._id.toString() == pid)
            if(!prod) throw new Error()
            prod.quantity = quantity.quantity
            await CartServices.saveCart(cart)
            respuesta(res, 200, 'cantidad editada correctamente')
        } catch (error) {
            console.log(error)
            respuesta(res, 200, 'error al actualizar la cantidad')
        }
    }

    async finalPurchase(req, res){
        const cartId = req.params.cid
        try {
            const user = await UserServices.getUserByCart(cartId)
            if(!user) throw new Error('Usuario no encontrado')

            const cart = await CartServices.getCarts(cartId)
            if(!cart) throw new Error('Carrito no encontrado')

            const cartClean =  JSON.parse(JSON.stringify(cart));

            let {cartOK, cartNOT} = checkStock(cartClean.products)
            for(const item of cartOK){
                let productUpdate = item.product
                productUpdate.stock -= item.quantity
                await ProductsService.updateProduct(productUpdate._id, {stock: productUpdate.stock})
            };

            const updateCart = await CartServices.updateAll(cart._id, {products: cartNOT})

            let ticket = await TicketServices.addTicket({purchaser: user.email}, cartOK)

            console.log("TICKETTT", ticket)

            res.redirect(`/ticket/${ticket._id.toString()}`)
        } catch (error) {
            console.log(error)
            res.status(404).send("error")
        }
    }
}

export default new CartController()