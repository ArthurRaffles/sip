import { RootState } from '../index';
import { StaticDataState } from './reducer';

const getStatic = (state: RootState): StaticDataState => state.static;

export const getTenors = (state: RootState) => {
    const { tenors } = getStatic(state);
    return tenors;
};
