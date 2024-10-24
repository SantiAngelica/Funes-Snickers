import ticketModel from "./models/ticket.model.js";

class TicketDao{
    async get(id){
        if(!id) return await ticketModel.find()
        return await ticketModel.findById(id)
    }
    async getOne(query){
        return await ticketModel.findOne(query)
    }
    async add(data){
        const ticket = new ticketModel(data)
        return await ticket.save()
    }
    async delete(id){
        return await ticketModel.findByIdAndDelete(id)
    }

}

export default new TicketDao()