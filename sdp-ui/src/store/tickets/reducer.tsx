
import { TicketActionCreators } from './actions';
import { GenericAction } from '../action-creator';
import createReducer, { Reducers } from '../../utils/reducer.utils';
import { ticketsUtils } from './utils';

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
const reducers: Reducers<TicketsState> = {
    [TicketActionCreators.addTicket.type]: (state: TicketsState, action: GenericAction<string>): TicketsState => {
        const symbol = action.payload;
        const id = `t${ticketsUtils.nextId()}`; //  `t${ticketCounter++}`;
        return {
            ...state,
            [id]: { id, symbol }
        };
    },
    
    [TicketActionCreators.removeTicket.type]: (state: TicketsState, action: GenericAction<string>): TicketsState => {
        const id = action.payload;
        return Object.keys(state)
            .filter((key: string) => key !== id)
            .reduce((acc: any, key: string)=> {
                acc[key] = state[key];
                return acc;
            }, {});
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
