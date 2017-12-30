import { Action } from "redux";

export interface Reducers<TState> {
    [key: string]: (state: TState, action: Action) => TState;
}

export default function createReducer<TState>(reducers: Reducers<TState>, initialState: TState) {
    return (state: TState = initialState, action: Action) => {
        const { type } = action;
        return (type in reducers) 
            ? reducers[type](state, action)
            : state;
    }
}