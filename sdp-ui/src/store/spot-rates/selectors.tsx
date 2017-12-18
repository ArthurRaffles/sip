import { createSelector } from 'reselect';
import { RootState } from '../index';

const getSpotRates = (state: RootState) => state.spotRates;

export const subscribePrice = createSelector(
    getSpotRates, (rates) => {
        return rates.prices.get('GBPUSD'); // obs needs to pick up from x
  },
);
