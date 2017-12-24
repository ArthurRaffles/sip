
import { TicketActionCreators } from './actions';
import { GenericAction } from '../action-creator';

export interface Ticket {
    id: string;
    symbol: string;
    tenor?: string;
};

export interface TicketUpdatePayload {
    id: string;
    field: string;
    value: any;
}
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

const handleUpdateTicket = (state: TicketsState, action: GenericAction<TicketUpdatePayload>): TicketsState => {
    const { id, field, value } = action.payload;
    return state.map((ticket: Ticket) => {
        if (ticket.id === id){
            return {
                ...ticket,
                [field]: value
            }
        }
        return ticket;
    })
};

export default function reducer(state: TicketsState = initialState, action: any): TicketsState {
    switch(action.type) {
        case TicketActionCreators.addTicket.type:
            return handleAddTicket(state, action);
        case TicketActionCreators.removeTicket.type:
            return handleRemoveTicket(state, action);
        case TicketActionCreators.updateTicket.type:
            return handleUpdateTicket(state, action);
    }
    return state;
}
