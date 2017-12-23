import { ActionCreator } from '../action-creator';
import { PricePayload } from './definitions';

export const PriceActionCreators = {
    subscribeToPriceUpdate:  new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE'),
    // connectToPriceServer: new ActionCreator<'CONNECT_PRICE', string>('CONNECT_PRICE'),
    // priceServerStatus: new ActionCreator<'SERVER_STATUS', string>('SERVER_STATUS'),
    priceUpdate: new ActionCreator<'PRICE_UPDATE', PricePayload>('PRICE_UPDATE'),
};
