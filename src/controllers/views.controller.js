import productsService from "../services/products.service.js"
import { CartServices } from "../services/index.services.js"
import PaginateProductsDTO from "../dto/paginate.dto.js"
import UserDTO from "../dto/user.dto.js"


class ViewsController {
    async showProducts(req, res){
        let limit = parseInt(req.query.limit) || 9
        let page = parseInt(req.query.page) || 1
        let sort = req.query.sort ? { price: parseInt(req.query.sort) } : {}
        let query = req.query.query ? { category: req.query.query } : {}
        try {
            const options = {
                limit: limit,
                page: page ,
                sort: sort ,
                ...query ? { query } : {} 
            }
            const products = await productsService.getProducts(query, options)
            const response = new PaginateProductsDTO(products)

            let cleanProducts = response.payload.map(product => {
                const prodClean = JSON.parse(JSON.stringify(product))
                return prodClean
            });
            response.payload = cleanProducts
            res.render('home', {response})
        } catch (error) {
            console.log(error)
            res.status(500).send({status:"incomplete", message: "Productos no encontrados"})
        }
    }

    async showProductByid(req, res, plantilla){
        const pid = req.params.pid
        try {
            const prod = await productsService.getProductById(pid)
            if(!prod) throw new Error()
            const prodClean =  JSON.parse(JSON.stringify(prod));
            res.render(plantilla, {prod: prodClean} )       
        } catch (error) {
            res.status(404).send('Producto no encontrado')
        }
    }

    async showCartById(req, res){
        let cid = req.params.cid
        try {
            const cart = await CartServices.getCarts(cid)
            const cartClean =  JSON.parse(JSON.stringify(cart));
            if(!cart) throw new Error()
            res.render("cart", {cart: cartClean})
        } catch (error) {
            res.status(404).send("Carrito no encontrado")
        }
    }

    async showSession(req, res){
        if (req.cookies.santiCookie) {
            return res.redirect("/profile")
         }
         res.render("sessions")
    }

    async showProfile(req, res){
        if (!req.user) {
            return res.render("sessions")
        }
        if(req.user.role =='admin') {
            return res.redirect("/realtimeproducts")
        }

        let usuario = new UserDTO(req.user)

        res.render("profile", {user: usuario})
    }


}

export default new ViewsController()