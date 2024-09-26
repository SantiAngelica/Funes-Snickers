import { Router } from "express";


import ProductManager from "../dao/db/product-manager-db.js";
const ManagerProd = new ProductManager()

import CartManager from "../dao/db/cart-manager-db.js";

const ManagerCart = new CartManager()
import {jwtValidator} from "../dao/utils/jwt.utils.js";

const router = Router()
import { authorization, passportCall } from "../dao/utils/passportCall.utils.js";



//LISTA TODOS LOS PRODUCTOS
router.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit) || 10
    let page = parseInt(req.query.page) || 1
    let sort =req.query.sort ? {price: parseInt(req.query.sort)} : {}
    let category = req.query.query ? {category: req.query.query} : {}


    try {
        const response = await ManagerProd.getProducts(limit,page,sort,category)
        let productosLimpios = response.payload.map(product => {
            const prodClean = JSON.parse(JSON.stringify(product))
            return prodClean
        });

        response.payload = productosLimpios
        res.render("home", {response})
    } catch (error) {
        res.status(500).send("Error interno del servidor al recibir el listado de clientes"); 
    }
})




//MUESTRA EL PRODUCTO CON EL ID PROPORCIONADO
router.get("/products/:cty/:pid", async (req, res) => {

    const prod = await ManagerProd.getProductById(req.params.pid)
    const prodClean =  JSON.parse(JSON.stringify(prod));
    res.render("prodDetail", {prod: prodClean} )
})



//EDITOR DE PRODCUTOS, SOLO PARA ADMIN
router.get("/realtimeproducts",passportCall("current") , authorization("admin"), (req, res) => {
    console.log(req.user)
    if(req.user.role != 'admin'){
        return res.status(403).send("acceso denegado")
    }
    res.render("realTimeProducts")
})

//VISTA PARA EDITAR UN PRODUCTO
router.get("/realtimeproducts/edit/:pid",passportCall("current") , authorization("admin"), async (req, res) => {
    const prod = await ManagerProd.getProductById(req.params.pid)
    const prodClean =  JSON.parse(JSON.stringify(prod));
    res.render("editProds", {prod: prodClean} )
})

//CARRITO CON EL ID PROPORCIONADO
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





//VISTA PARA LOGEARSE Y REGISTRARSE
router.get("/sessions", (req, res) => {
    if (req.cookies.santiCookie) {
       return res.redirect("/profile")
    }
    res.render("sessions")
})




//PERFIL
router.get("/profile", jwtValidator ,(req, res) => {
    
    if (!req.user) {
        return res.render("sessions")
    }
    if(req.user.role =='admin') {
        return res.redirect("/realtimeproducts")
    }
    res.render("profile", {user: req.user})
})


export default router