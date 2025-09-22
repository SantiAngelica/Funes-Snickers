import productsService from "../services/products.service.js"
import { CartServices } from "../services/index.services.js"
import PaginateProductsDTO from "../dto/paginate.dto.js"
import TicketServices from "../services/ticket.services.js"
import UserDTO from "../dto/user.dto.js"

class ViewsController {
    async showProducts(req, res) {
        let limit = parseInt(req.query.limit) || 9
        let page = parseInt(req.query.page) || 1
        let sort = req.query.sort ? { price: parseInt(req.query.sort) } : {}
        let query = req.query.query ? { category: req.query.query } : {}
        try {
            const options = {
                limit: limit,
                page: page,
                sort: sort,
                ...query ? { query } : {}
            }
            const products = await productsService.getProducts(query, options)
            const response = new PaginateProductsDTO(products)

            let cleanProducts = response.payload.map(product => {
                const prodClean = JSON.parse(JSON.stringify(product))
                return prodClean
            });
            response.payload = cleanProducts
            res.render('home', { response })
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: "incomplete", message: "Productos no encontrados" })
        }
    }

    async showProductByid(req, res, plantilla) {
        const pid = req.params.pid
        try {
            const prod = await productsService.getProductById(pid)
            if (!prod) throw new Error()
            const prodClean = JSON.parse(JSON.stringify(prod));
            res.render(plantilla, { prod: prodClean })
        } catch (error) {
            res.status(404).send('Producto no encontrado')
        }
    }

    async showCartById(req, res) {
        let cid = req.params.cid
        try {
            const cart = await CartServices.getCarts(cid)
            const cartClean = JSON.parse(JSON.stringify(cart));
            if (!cart) throw new Error()
            res.render("cart", { cart: cartClean })
        } catch (error) {
            res.status(404).send("Carrito no encontrado")
        }
    }

    async showSession(req, res) {
        if (req.cookies.santiCookie) {
            return res.redirect("/profile")
        }
        res.render("sessions")
    }

    async showProfile(req, res) {
        if (!req.user) {
            return res.render("sessions")
        }
        if (req.user.role == 'admin') {
            return res.redirect("/realtimeproducts")
        }

        let usuario = new UserDTO(req.user)

        res.render("profile", { user: usuario })
    }

    async showTicket(req, res) {
        const ticketId = req.params.tid
        console.log(ticketId)
        try {
            const ticket = await TicketServices.getTickets(ticketId)
            if (!ticket) throw new Error("ticket no encontrado")
            const safeTicket = {
                code: ticket.code,
                purchase_datetime: ticket.purchase_datetime,
                amount: ticket.amount.toLocaleString(),
                purchaser: ticket.purchaser
            }
            console.log(safeTicket)
            res.render("ticket", { ticket: safeTicket })
        } catch (error) {
            console.log(error)
            res.status(404).send("ticket no encontrado")
        }
    }
}

export default new ViewsController()