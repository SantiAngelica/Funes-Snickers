import TicketDao from "../dao/ticket.dao.js";

class TicketRepository{
    async getTickets(tid){
        if(!tid) return await TicketDao.get()
        return await TicketDao.get(tid)
    }
    async getOneTicket(query){
        return await TicketDao.getOne(query)
    }
    async addTicket(ticketData){
        return await TicketDao.add(ticketData)
    }
    async deleteTicket(tid){
        return await TicketDao.delete(tid)
    }
}

export default new TicketRepository()