import { RootState } from '../index';
import { Ticket, TicketsState } from './reducer';

export const getTickets = (state: RootState): TicketsState => state.tickets;

export const getTicketsAsArray = (state: RootState): Ticket[] => Object.keys(state.tickets).map((id: string) => state.tickets[id]);

export const getTicket = (state: RootState) => {
    const tickets = getTickets(state);
    return (ticketId: string): Ticket => tickets[ticketId] || { id: 'new', symbol: 'foo' };
};
