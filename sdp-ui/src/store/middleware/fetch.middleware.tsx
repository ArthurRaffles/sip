import { Action } from 'redux';
import { Middleware, MiddlewareAPI } from 'redux';

export const fetchMiddleware = (store: any) =>
        (next: any) => (action: Action) => {
    console.log('fetch mw', action);
    return next(action);
}
