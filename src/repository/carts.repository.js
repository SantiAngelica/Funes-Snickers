import CartsDao from "../dao/carts.dao.js";


class CartsRepository {
    async getCarts(cid) {
        if (!cid) return await CartsDao.getAll()
        else return await CartsDao.getById(cid)
    }
    async createCart() {
        return await CartsDao.create()
    }
    async saveCart(cart) {
        return await CartsDao.save(cart)
    }
    async updateAll(cid, data) {
        return await CartsDao.updateAll(cid, data)
    }
}

export default CartsRepository