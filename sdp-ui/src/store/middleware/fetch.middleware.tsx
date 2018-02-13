import { Action } from 'redux';
// import { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../index';
import { GenericAction} from '../action-creator';
import { httpApi } from './http.api';

export enum FetchMode {
    GET,
    POST
}
export interface FetchPayload {
    url: string;
    mode: FetchMode;
}
export const BASE_URL = 'http://localhost:8999';
const CALL_API = 'CALL_API';
export class FetchAction<P extends FetchPayload> implements GenericAction<P> {
    readonly responseType: string;
    readonly type: string;
    readonly payload: P;
    readonly CALL_API: string = CALL_API;
    constructor(type: string, responseType: string, payload: P) {
        this.responseType = responseType; 
        this.type = type; 
        this.payload = payload; 
    }
}
export const fetchMiddleware = (store: any) =>
        (next: any) => (action: Action) => {
            const shouldCall: any = action.CALL_API
    console.log('fetch mw', action);
    return next(action);
}
