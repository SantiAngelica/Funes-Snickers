import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"


const productsSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [String],
        required: true
    }
})


productsSchema.plugin(mongoosePaginate)

const ProductsModel = mongoose.model("products", productsSchema)

export default ProductsModel