import express from "express"
const app = express()
import exphbs from "express-handlebars";
const PUERTO = 8080
import { Server } from "socket.io";

import ProductManager from "./dao/db/product-manager-db.js";
const manager = new ProductManager()

import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'

import "./db.js"

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";


import passport from "passport";
import initializedPassport from "./dao/config/passport.config.js";



//MIDLEWARS
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

app.use(cookieParser())
initializedPassport()
app.use(passport.initialize())






//Configuramos Express-Handlebars
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

import Handlebars from 'handlebars'

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
})










//rutas
app.use("/api/carts", cartRouter)
app.use("/api/products", productsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)



//levantamos server
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})










//websocket
const io = new Server(httpServer)




io.on("connection", async (socket) => {


    socket.emit("list products", await manager.getProducts("all"))

    socket.on("delete prod", async (pid) => {
        const success = await manager.deleteProduct(pid)
        io.emit("list products", await  manager.getProducts("all"))
    })

     socket.on("form data", async (data) => {
         const response = await manager.addProduct(data)
         io.emit("list products", await manager.getProducts("all"))
         io.emit("response add prod", response)
 })

   
})







