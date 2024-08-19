import { Router } from "express";


import ProductManager from "../dao/db/product-manager-db.js";
const ManagerProd = new ProductManager()

import CartManager from "../dao/db/cart-manager-db.js";

const ManagerCart = new CartManager()

const router = Router()




router.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = parseInt(req.query.page) || 1
    let sort =req.query.sort ? {price: parseInt(req.query.sort)} : {}
    let category = req.query.query ? {category: req.query.query} : {}


    try {
        const response = await ManagerProd.getProducts(limit,page,sort,category)
        let productosLimpios = response.payload.map(product => {
            const prodClean = JSON.parse(JSON.stringify(product))
            prodClean.price = prodClean.price.toLocaleString('es-ES')
            return prodClean
        });

        response.payload = productosLimpios
        res.render("home", {response})
    } catch (error) {
        res.status(500).send("Error interno del servidor al recibir el listado de clientes"); 
    }
})

router.get("/products/:cty/:pid", async (req, res) => {

    const prod = await ManagerProd.getProductById(req.params.pid)
    
    const prodClean =  JSON.parse(JSON.stringify(prod));
    prodClean.price = prodClean.price.toLocaleString('es-ES')
    res.render("prodDetail", {prod: prodClean} )
})




router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
})


router.get("/realtimeproducts/edit/:pid", async (req, res) => {
    const prod = await ManagerProd.getProductById(req.params.pid)
    const prodClean =  JSON.parse(JSON.stringify(prod));
    res.render("editProds", {prod: prodClean} )
})


router.get("/carts/:cid", async (req, res) => {
    let cid = req.params.cid
    const cart = await ManagerCart.getCartById(cid)
    const cartClean =  JSON.parse(JSON.stringify(cart));
    if (cartClean) {
       res.render("cart", {cart: cartClean})
    }
    else {
        res.status(404).send("Carrito no encontrado :(")
    }
})



export default router