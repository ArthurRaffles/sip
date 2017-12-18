import { RootState } from '../index';
import { Ticket } from './reducer';

export const getTickets = (state: RootState) => state.tickets;

export const getTicket = (state: RootState) => {
    const tickets = getTickets(state);
    return (ticketId: string) => tickets.find((ticket: Ticket) => ticket.id === ticketId);
};
