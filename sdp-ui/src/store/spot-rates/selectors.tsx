import { RootState } from '../index';
import { SpotRate } from './reducer';
import { PriceItem, PriceType } from '../../definitions';

const getSpotRates = (state: RootState) => state.spotRates;

export const getSpotRate1 = (state: RootState) => {
    const rates = getSpotRates(state);
    return (symbol: string): SpotRate => (rates[symbol] || ({ price: {}, previous: {}}));
};

export const getPrice = (state: RootState) => {
    const rates = getSpotRates(state );
    return (symbol: string, priceType: PriceType): PriceItem =>{
        const price = (rates[symbol] || ({ price: {}, previous: {}}));
        switch(priceType) {
            case 'bid':
                return {
                    price: price.price.bid,
                    priceChange: price.price.bid - price.previous.bid
                }
            case 'ask':
                return {
                    price: price.price.ask,
                    priceChange: price.price.ask - price.previous.ask
                }
        }
    } ;
};
