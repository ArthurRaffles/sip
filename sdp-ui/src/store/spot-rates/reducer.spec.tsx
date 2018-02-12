
import reducer, { SpotRateState, SpotRate } from './reducer';
import { PriceActionCreators } from './actions';
const createPrice = (bid:  number, ask: number, symbol: string= SYMBOL) => ({
    bid,
    ask
});
const SYMBOL = 'GBPUSD';
const createSpotRate = (): SpotRate => {
    return {
        price: createPrice(1,2, 'GBPUSD'),
        previous: createPrice(1,2, 'GBPUSD')
    }
}
describe('spot-rates/reducer spec', () => {
    let state: any;
    beforeEach(() => {
        state = reducer(undefined, {
            type: PriceActionCreators.priceUpdate.type,
            payload: {
                symbol: 'GBPUSD',
                bid: 1,
                ask: 2
            }
        });
    })
    describe('when calling handle price update on initial state', () => {
        it('should update state for key', () => {
            
            expect(state).toEqual({
                GBPUSD: {
                    price: createPrice(1,2),
                    previous: createPrice(0,0)
                }
            })
        });
    });
    describe('when calling handle price update on update state', () => {
        it('should update state for key', () => {
            state = reducer(state, {
                type: PriceActionCreators.priceUpdate.type,
                payload: {
                    symbol: 'GBPUSD',
                    bid: 3,
                    ask: 5.44
                }
            });
            expect(state).toEqual({
                GBPUSD: {
                    price: createPrice(3,5.44),
                    previous: createPrice(1,2)
                }
            })
        });
    });
});