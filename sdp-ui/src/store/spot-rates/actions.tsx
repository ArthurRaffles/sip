import { ActionCreator } from '../action-creator';
import { PricePayload } from './definitions';
import {FetchAction, FetchMode, FetchPayload} from '../middleware/fetch.middleware';
import {httpApi} from '../middleware/http.api';
import thunk from 'redux-thunk';
export const RATE_ACTIONS = {
  FETCH_INSTRUMENTS: 'FETCH_INSTRUMENTS',
  FETCH_INSTRUMENTS_SUCCESS: 'FETCH_INSTRUMENTS_SUCCESS',
  FETCH_INSTRUMENTS_ERROR: 'FETCH_INSTRUMENTS_ERROR',
  SUBSCRIBE_PRICE: 'SUBSCRIBE_PRICE',
  PRICE_UPDATE: 'PRICE_UPDATE'
};
export const PriceActionCreators = {
    subscribeToPriceUpdate:  new ActionCreator<'SUBSCRIBE_PRICE', string>('SUBSCRIBE_PRICE'),
    priceUpdate: new ActionCreator<'PRICE_UPDATE', PricePayload>('PRICE_UPDATE'),
};

export const fetchInstruments = () => {
  const payload: FetchPayload = {
    url: 'instruments',
    responseType: RATE_ACTIONS.FETCH_INSTRUMENTS_SUCCESS,
    errorType: RATE_ACTIONS.FETCH_INSTRUMENTS_ERROR,
    mode: FetchMode.GET
  };
  return new FetchAction<any>(RATE_ACTIONS.FETCH_INSTRUMENTS, payload);
};

const instrumentSuccess = (data: any) => {
  return {
    type: RATE_ACTIONS.FETCH_INSTRUMENTS_SUCCESS,
    payload: data
  }
};
const instrumentError = (error: any) => {
  return {
    type: RATE_ACTIONS.FETCH_INSTRUMENTS_ERROR,
    error
  }
};
const BASE_URL = 'http://localhost:8999';
export const fetchInstrumentsAsync = () => {
  const url = 'instruments';
  return (dispatch: any) => {
    return dispatch(instrumentSuccess({}));
    // return httpApi.fetch(`${BASE_URL}\/${url}`, {
    //   method: 'GET'
    // })
    //  .then(response => response.json())
      // .then(data => dispatch(instrumentSuccess(data)))
      // .catch(err => dispatch(instrumentError(err)));
  }
  // const payload: FetchPayload = {
  //   url: 'instruments',
  //   responseType: RATE_ACTIONS.FETCH_INSTRUMENTS_SUCCESS,
  //   errorType: RATE_ACTIONS.FETCH_INSTRUMENTS_ERROR,
  //   mode: FetchMode.GET
  // };
  // return new FetchAction<any>(RATE_ACTIONS.FETCH_INSTRUMENTS, payload);
};
