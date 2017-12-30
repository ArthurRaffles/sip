
import { TicketActionCreators } from './actions';
import { GenericAction } from '../action-creator';
import createReducer, { Reducers } from '../../utils/reducer.utils';

export interface Ticket {
    id: string;
    symbol: string;
    tenor?: string;
    notional?: number;
};

export interface TicketUpdatePayload {
    id: string;
    field: string;
    value: any;
}
export interface TicketsState {
    [key: string]: Ticket
};
const initialState: TicketsState = {};
let ticketCounter = 0;

const reducers: Reducers<TicketsState> = {
    [TicketActionCreators.addTicket.type]: (state: TicketsState, action: GenericAction<string>): TicketsState => {
        const symbol = action.payload;
        const id = `t${ticketCounter++}`;
        return {
            ...state,
            [id]: { id, symbol }
        }
        //return [...state, { id: `t${ticketCounter++}`, symbol }]
    },
    
    [TicketActionCreators.removeTicket.type]: (state: TicketsState, action: GenericAction<string>): TicketsState => {
        const id = action.payload;
        return Object.keys(state)
            .filter((key: string) => key !== id)
            .reduce((acc: any, key: string)=> acc[key] = state[key], {});
        // const idx = state.findIndex((ticket: Ticket) => ticket.id === id);
        // return (idx > -1)
        //     ? [...state.slice(0, idx), ...state.slice(idx + 1)]
        //     : state;
    },
    
    [TicketActionCreators.updateTicket.type]: (state: TicketsState, action: GenericAction<TicketUpdatePayload>): TicketsState => {
        const { id, field, value } = action.payload;
        const newTicket = {
            ...state[id],
            [field]: value
        };
        return {
            ...state,
            [id]: newTicket
        };
    }   
}

export default createReducer<TicketsState>(reducers, initialState);
