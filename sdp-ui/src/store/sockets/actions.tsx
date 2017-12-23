import { ActionCreator } from '../action-creator';

export const SocketActionCreators = {
    connect: new ActionCreator<'CONNECT_PRICE', string>('CONNECT_PRICE'),
    statusChange: new ActionCreator<'SERVER_STATUS', string>('SERVER_STATUS')
};
