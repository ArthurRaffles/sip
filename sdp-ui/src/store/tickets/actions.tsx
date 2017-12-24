import { ActionCreator } from '../action-creator';
import { TicketUpdatePayload } from './reducer';

export const TicketActionCreators = {
    addTicket: new ActionCreator<'ADD_TICKET', string>('ADD_TICKET'),
    removeTicket: new ActionCreator<'REMOVE_TICKET', string>('REMOVE_TICKET'),
    updateTicket: new ActionCreator<'UPDATE_TICKET', TicketUpdatePayload>('UPDATE_TICKET'),
};
