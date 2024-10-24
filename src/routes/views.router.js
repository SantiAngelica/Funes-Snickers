import { Router } from 'express';


import ProductManager from "../dao/db/product-manager-db.js";
const ManagerProd = new ProductManager()

import CartManager from "../dao/db/cart-manager-db.js";

const ManagerCart = new CartManager()
import { jwtValidator } from "../utils/jwt.utils.js";

const router = Router()
import { passportCall, authorization } from "../utils/passportCall.utils.js";

import ViewsController from '../controllers/views.controller.js';



//LISTA TODOS LOS PRODUCTOS
router.get("/products", ViewsController.showProducts)

//MUESTRA EL PRODUCTO CON EL ID PROPORCIONADO
router.get("/products/:cty/:pid", (req, res) => {
    ViewsController.showProductByid(req, res, 'prodDetail')
})

//EDITOR DE PRODCUTOS, SOLO PARA ADMIN
router.get("/realtimeproducts", passportCall('current'), authorization('admin'), (req, res) => {
    res.render("realTimeProducts")
})

//VISTA PARA EDITAR UN PRODUCTO
router.get("/realtimeproducts/edit/:pid", passportCall('current'), authorization('admin'), (req, res) => {
    ViewsController.showProductByid(req, res, 'editProds')
})

//CARRITO CON EL ID PROPORCIONADO
router.get("/carts/:cid", ViewsController.showCartById)


//VISTA PARA LOGEARSE Y REGISTRARSE
router.get("/sessions", ViewsController.showSession)

//PERFIL
router.get("/profile", jwtValidator, ViewsController.showProfile)


export default router