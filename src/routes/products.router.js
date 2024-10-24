import {Router} from 'express';
const router = Router()
import productsController from '../controllers/products.controller.js';
import  {authorization, passportCall}  from '../utils/passportCall.utils.js';



//MOSTRAR LISTA DE PRODUCTS
router.get("/", productsController.getProducts)

//EDITA EL PRODUCTO CON EL ID PROPORCIONADO CON LAS PROPIEDADES AGREGADAS
router.put("/:pid",passportCall('current'), authorization('admin'),productsController.editProduct)

//MOSTRAR EL PRODUCTO CON EL ID PROPORCIONADO
router.get("/:pid", productsController.getProductById)

//AGREGRA NUEVO PRODUCTO
router.post("/",passportCall('current'), authorization('admin') ,productsController.addProduct)

//BORRA EL PRODUCTO CON EL ID PROPORICONADO
router.delete("/:pid",passportCall('current'), authorization('admin') ,productsController.deleteProduct)


export default router