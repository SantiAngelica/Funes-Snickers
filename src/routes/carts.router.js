import {Router} from "express";
const router = Router()

import CartsController from "../controllers/carts.controller.js";
import  {authorization, passportCall}  from "../utils/passportCall.utils.js";


//CREAR UN NUEVO CARRITO
router.post("/", CartsController.createCart)

//AGREGA EL PRODUCTO CON EL ID PROPORCIONADO AL CARRITO CON EL ID PROPORCIONADO
router.post("/:cid/products/:pid/:qty", passportCall('current'), authorization('user') ,CartsController.addProdToCart)

//LISTAR CARRITO CON EL ID PROPORCIONADO
router.get("/:cid", CartsController.getCartById)

//ELIMINAR UN PRODUCTO DE UN CARRITO
router.delete("/:cid/products/:pid", CartsController.deleteOneProd)

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
router.delete("/:cid", CartsController.deleteAllProducts)

//ACTUALIZAR TODOS LOS PRODUCTO DEL CARRITO
router.put("/:cid", CartsController.updateAllProducts)

//ACTUALIZAR LA CANTIDAD DE UN PRODUCTO
router.put("/:cid/products/:pid", CartsController.updateQuantity)

//FInalizar compra
router.post("/:cid/purchase", CartsController.finalPurchase)


export default router