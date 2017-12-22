
import { PriceActionCreators } from './actions';

export interface TickerPrice {
    symbol: string;
    price: number;
    lastPrice?: number;
    priceChange?: number;
};

export interface SpotRateState {
    [key: string]: TickerPrice;
}

export const initialState: SpotRateState = { };

const handlePriceUpdate = (state: SpotRateState, action: any): SpotRateState => {
    const { symbol, price } = action.payload;
    const previous = state[symbol];
    const lastPrice = previous && previous.price;
    const priceChange = price - Number(lastPrice);
    return {
        ...state,
        [symbol]: { ...action.payload, lastPrice, priceChange }
    }
};

export default function reducer(state: SpotRateState = initialState, action: any): SpotRateState {
    switch(action.type) {
        case PriceActionCreators.PriceUpdate.type:
            return handlePriceUpdate(state, action);
    }
    return state;
}
