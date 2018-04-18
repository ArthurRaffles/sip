import { GenericAction} from '../action-creator';
import { httpApi } from './http.api';

export enum FetchMode {
    GET,
    POST
}
export interface FetchPayload {
    url: string;
    responseType: string;
    errorType: string;
    mode: FetchMode;
}

export const BASE_URL = 'http://localhost:8999';
const CALL_API = 'CALL_API';
export class FetchAction<P extends FetchPayload> implements GenericAction<P> {
    readonly type: string;
    readonly payload: P;
    readonly CALL_API: string = CALL_API;
    constructor(type: string, payload: P) {
        this.type = type;
        this.payload = payload;
    }
}

export const fetchMiddleware = (store: any) =>
        (next: any) => (action: any) => {
            const act = (action as FetchAction<FetchPayload>);
            const shouldCall: boolean = !!(action as FetchAction<FetchPayload>).CALL_API;
            console.log('fetch mw', action, shouldCall);

            if (shouldCall) {
              console.warn('calling ... ', next);
              const { url, mode, responseType, errorType } = act.payload;

              httpApi.fetch(`${BASE_URL}\/${url}`, {
                  method: mode === FetchMode.POST ? 'POST': 'GET'
              })
                .then((response: any) => response.json())
                .then((data: any) => {
                  console.warn('DATA RECEIVED', data);
                  const newAction = {
                    type: responseType,
                    data
                  };
                  next(newAction);
                })
                .catch((error: any) => {
                  const newAction = {
                    type: errorType,
                    error
                  };
                  next(newAction);
                })
            } else {
              return next(action);
            }


};
