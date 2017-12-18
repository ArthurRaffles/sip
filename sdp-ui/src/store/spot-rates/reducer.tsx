
import { PriceActionCreators } from './actions';

export type TickerPrice = {
    readonly symbol: string;
    readonly price: number;
};

export type SpotRateState = {
  readonly prices: Map<string, TickerPrice>;
};

export const initialState: SpotRateState = {
  prices: new Map<string, TickerPrice>([['GBPUSD' , { symbol: 'GBPUSD', price: 2.2 }]])
};

const handlePriceUpdate = (state: SpotRateState, action: any): SpotRateState => {
    const { symbol, price } = action.payload;
    console.log('reducer', action);
    const prices  = state.prices.set(symbol, { symbol, price })
    return {
        ...state,
        prices: new Map(prices)
    }
};

export default function reducer(state: SpotRateState = initialState, action: any): SpotRateState {
    switch(action.type) {
        case PriceActionCreators.PriceUpdate.type:
        return handlePriceUpdate(state, action);
    }
    return state;
}
