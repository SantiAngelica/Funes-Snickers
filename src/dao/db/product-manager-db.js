import ProductsModel from "../models/products.model.js"



class ProductManager {

    async getProducts(limit, page, sort, query) {
        try {
            if (limit == "all") {
                let res = await ProductsModel.find()
                return res
            } else {
                const options = {
                    limit: limit,
                    page: page ,
                    sort: sort ,
                    ...query ? { query } : {} 
                };
        
                let res = await ProductsModel.paginate(query || {}, options);

                let status = res ? "success" : "error";

                return {
                    status: status,
                    payload: res.docs,
                    totalPages: res.totalPages,
                    prevPage: res.prevPage,
                    nextPage: res.nextPage,
                    page: res.page,
                    hasPrevPage: res.hasPrevPage,
                    hasNextPage: res.hasNextPage,
                    prevLink: res.hasPrevPage? `/products?page=${res.prevPage}` : null,
                    nextLink: res.hasNextPage? `/products?page=${res.nextPage}` : null
                };
            }

        } catch (error) {
            return error
        }
    }

    async addProduct(newProduct) {
        try {
            if (!newProduct.tittle || !newProduct.description || !newProduct.price || !newProduct.thumbnails || !newProduct.code || !newProduct.stock || !newProduct.status || !newProduct.category) {
                return 1
            }
            const codeRepit = await ProductsModel.findOne({ code: newProduct.code })
            if (codeRepit) {
                console.log("El codigo debe ser unico")
                return 2
            }

            const newProd = new ProductsModel(newProduct)

            newProd.save()
            return newProd
        } catch (error) {
            console.log("error al agregar un producto")
            return false
        }
    }

    async getProductById(id) {
        const prod = await ProductsModel.findById(id)
        if (prod) {
            return prod
        }
        else {
            return null
        }
    }

    async editProduct(pid, data) {
        try {
            const prodUpdate = await ProductsModel.findByIdAndUpdate(pid, data)

            if (!prodUpdate) {
                console.log("producto no encontrado")
                return false
            } else {
                return prodUpdate;
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const success = await ProductsModel.findByIdAndDelete(id)
            if (!success) {
                console.log("producto no encontrado")
                return false
            }
            return success
        } catch (error) {
            console.log("error al eliminar producto")
            return false
        }
    }
}

export default ProductManager