import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    purchase_datetime: {
        type: Date,
        default: new Date(),
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

const ticketModel = mongoose.model("tickets", ticketSchema)

export default ticketModel