import TicketRepository from "../repository/ticket.repository.js";
import ProductsRepository from "../repository/products.repository.js";
import { generateTicketCode, calculateTotal } from "../utils/ticket.utils.js";

class TicketServices{
    async getTickets(tid){
        if(!tid) return await TicketRepository.getTickets()
        return await TicketRepository.getTickets(tid)
    }
    async getOneTicket(query){
        return await TicketRepository.getOneTicket(query)
    }
    async addTicket(ticketData, cart){

        const amount = calculateTotal(cart)

        const code = generateTicketCode()

        ticketData.amount = amount
        ticketData.code = code

        return await TicketRepository.addTicket(ticketData)
    }
    async deleteTicket(tid){
        return await TicketRepository.deleteTicket(tid)
    }
}

export default new TicketServices()