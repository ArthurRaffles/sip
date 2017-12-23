
import { PriceActionCreators } from './actions';

export interface SpotRate {
    price: TickerPrice;
    previous: TickerPrice;
}

export interface TickerPrice {
    bid: number;
    ask: number;
    // priceChange?: number;
};


export interface SpotRateState {
    [key: string]: SpotRate;
}

export const initialState: SpotRateState = { };

// const getPreviousPrice = (previous: TickerPrice, ) => {
//     const previous = state[symbol];

// };
const handlePriceUpdate = (state: SpotRateState, action: any): SpotRateState => {
    const { symbol, bid, ask } = action.payload;
    const lastRate: SpotRate = state[symbol];
    const previous = lastRate && lastRate.price ? { ...lastRate.price } : { symbol, bid: 0 , ask: 0};
   // const bid = 
    // const priceChange = price - Number(lastPrice);
    const newTickerPrice: SpotRate = {
        price: { bid, ask },
        previous
    };
    return {
        ...state,
        [symbol]: newTickerPrice
    }
};

export default function reducer(state: SpotRateState = initialState, action: any): SpotRateState {
    switch(action.type) {
        case PriceActionCreators.priceUpdate.type:
            return handlePriceUpdate(state, action);
    }
    return state;
}
