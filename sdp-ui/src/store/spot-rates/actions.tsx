// import { ActionCreator } from 'react-redux-typescript';
import { ActionCreator } from '../action-creator';
import { TickerPrice } from './reducer';
// export const subscribeToPrice = new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE');
// export const connectToPrice = new ActionCreator<'CONNECT_PRICE', string>('CONNECT_PRICE');
// export const priceConnected = new ActionCreator<'PRICE_CONNECTED', string>('PRICE_CONNECTED');

export const PriceActionCreators = {
    subscribeToPrice:  new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE'),
    connectToPriceServer: new ActionCreator<'CONNECT_PRICE', string>('CONNECT_PRICE'),
    priceServerStatus: new ActionCreator<'SERVER_STATUS', string>('SERVER_STATUS'),
    PriceUpdate: new ActionCreator<'PRICE_UPDATE', TickerPrice>('PRICE_UPDATE'),
};

