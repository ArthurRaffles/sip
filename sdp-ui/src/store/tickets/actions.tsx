import { ActionCreator } from '../action-creator';

export const TicketActionCreators = {
    addTicket:  new ActionCreator<'ADD_TICKET', string>('ADD_TICKET'),
    removeTicket:  new ActionCreator<'REMOVE_TICKET', string>('REMOVE_TICKET'),
};
