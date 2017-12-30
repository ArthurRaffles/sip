import { Action } from 'redux';

export interface GenericAction<T> extends Action {
  payload: T
}

export class ActionCreator<T, P> implements GenericAction<P>{
  readonly type: T;
  readonly payload: P;

  constructor(type: T) { this.type = type; }
  create = (payload: P) => ({ type: this.type, payload });
}
