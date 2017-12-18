import { RootState } from '../index';
import { TickerPrice } from './reducer';

const getSpotRates = (state: RootState) => state.spotRates;

export const getSpotRate1 = (state: RootState) => {
    const rates = getSpotRates(state);
    return (symbol: string): TickerPrice => (rates[symbol] || ({ symbol, price: 0 }));
};
