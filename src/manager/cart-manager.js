import fs from "fs"




class CartManager{
    constructor(){
        this.carts = []
    }
    async getCarts(){
        try {
            let res = await fs.promises.readFile("./src/assets/carts.json", "utf-8")
            const carts = JSON.parse(res)
            return carts
        } catch (error) {
            return this.carts
        }
    }
    async newCart(){
        const carts = await this.getCarts()
        const newCart = {
            id: carts.length + 1,
            products: []
        }
        carts.push(newCart)
        await fs.promises.writeFile("./src/assets/carts.json", JSON.stringify(carts, null, 2))
    }
    async getCartById(cid){
        const carts = await this.getCarts()

        const cart = carts.find(cart => cart.id == cid)
        return cart
    }
    async addProdToCart(pid, cid){
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id == cid)
        if(cart){
            const prod = cart.products.find(prod => prod.id == pid)
            if(prod){
                prod.quantity+=1
            }else{
                cart.products.push({
                    id: pid,
                    quantity: 1
                })
            }
            await fs.promises.writeFile("./src/assets/carts.json", JSON.stringify(carts, null, 2))
            return 1
        }
        return 0
    }
}

export default CartManager