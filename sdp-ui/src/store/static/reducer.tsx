import { StaticActionCreators } from './actions';

export interface StaticDataState {
    tenors: string[];
}

const initialState = {
    tenors: [
        'SPOT',
        '1D',
        '1W',
        '1M'
    ]
};

const handleTenorsReceived = (state: StaticDataState, action: any): StaticDataState => {
    return {
        ...state,
        tenors: [...action.payload]
    }
};

export default function reducer(state: StaticDataState = initialState, action: any): StaticDataState {
    switch(action.type) {
        case StaticActionCreators.tenorsReceived.type:
            return handleTenorsReceived(state, action);
    }
    return state;
}