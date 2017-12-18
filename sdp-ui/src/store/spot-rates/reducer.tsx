
import { PriceActionCreators } from './actions';

export type TickerPrice = {
    readonly symbol: string;
    readonly price: number;
};

export interface SpotRateState {
    [key: string]: TickerPrice;
};
export const initialState: SpotRateState = { };

const handlePriceUpdate = (state: SpotRateState, action: any): SpotRateState => {
    const { symbol } = action.payload;
    return {
        ...state,
        [symbol]: action.payload
    }
};

export default function reducer(state: SpotRateState = initialState, action: any): SpotRateState {
    switch(action.type) {
        case PriceActionCreators.PriceUpdate.type:
            return handlePriceUpdate(state, action);
    }
    return state;
}
