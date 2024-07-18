import express from "express"
const app = express()
const PUERTO = 8080

import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'




app.use(express.json())

app.use("/api/carts", cartRouter)
app.use("/api/products", productsRouter)






app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})
