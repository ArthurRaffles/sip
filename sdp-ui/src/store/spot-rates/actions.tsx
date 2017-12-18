import { ActionCreator } from '../action-creator';
import { TickerPrice } from './reducer';

export const PriceActionCreators = {
    subscribeToSpotRate:  new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE'),
    connectToPriceServer: new ActionCreator<'CONNECT_PRICE', string>('CONNECT_PRICE'),
    priceServerStatus: new ActionCreator<'SERVER_STATUS', string>('SERVER_STATUS'),
    PriceUpdate: new ActionCreator<'PRICE_UPDATE', TickerPrice>('PRICE_UPDATE'),
};
