import express from "express"
const app = express()
import exphbs from "express-handlebars";
const PUERTO = 8080
import { Server } from "socket.io";

import ProductManager from "./manager/product-manager.js";
const manager = new ProductManager()

import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'



//MIDLEWARS
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

import Handlebars from 'handlebars'

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
})




app.use("/api/carts", cartRouter)
app.use("/api/products", productsRouter)
app.use("/", viewsRouter)




const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})

const io = new Server(httpServer)

io.on("connection", async (socket) => {


    socket.emit("list products", await  manager.getProducts())

    socket.on("delete prod", async (pid) => {
        const success = await manager.deleteProduct(pid)
        console.log(success)
        io.emit("list products", await  manager.getProducts())
    })

    socket.on("form data", async (data) => {
        const response = await manager.addProduct(data)
        socket.emit("response add prod", response)
    })

   
})







