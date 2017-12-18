
import { TicketActionCreators } from './actions';

export interface Ticket {
    id: string;
    symbol: string;
};

export type TicketsState = Array<Ticket>;
const initialState: TicketsState = []

let ticketCounter = 0;
const handleAddTicket = (state: TicketsState, action: any): TicketsState => {
    const symbol = action.payload; 
    return [...state, { id: `t${ticketCounter++}`, symbol }]
};

const handleRemoveTicket = (state: TicketsState, action: any): TicketsState => {
    const { id } = action.payload;
    const idx = state.findIndex((ticket: Ticket) => ticket.symbol === id);
    return [...state.slice(0, idx), ...state.slice(idx + 1)]
};

export default function reducer(state: TicketsState = initialState, action: any): TicketsState {
    switch(action.type) {
        case TicketActionCreators.addTicket.type:
            return handleAddTicket(state, action);
        case TicketActionCreators.removeTicket.type:
            return handleRemoveTicket(state, action);
    }
    return state;
}
