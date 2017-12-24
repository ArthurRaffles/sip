import { ActionCreator } from '../action-creator';
import { PricePayload } from './definitions';

export const PriceActionCreators = {
    subscribeToPriceUpdate:  new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE'),
    priceUpdate: new ActionCreator<'PRICE_UPDATE', PricePayload>('PRICE_UPDATE'),
};
