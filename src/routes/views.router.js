import { Router } from "express";
import ProductManager from "../manager/product-manager.js";
const manager = new ProductManager()

const router = Router()




router.get("/products", async (req,res) => {
    const products = await manager.getProducts()
    res.render("home", {products})
})


router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
})


router.get("/realtimeproducts/edit/:pid", async (req, res) => {
    const prod = await manager.getProductById(req.params.pid)
    res.render("editProds", {prod} )
})

router.put("/realtimeproducts/edit/:pid", async (req,res) => {
    const data = req.body
    const pid = req.params.pid
    manager.editProduct(pid, data)
})




export default router