import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/map';

import { Store } from '../index';
// import { ActionCreators, Action } from './reducer';
import rx from 'rxjs';
import { PriceActionCreators } from './actions';

// const socket$ = rx.Observable.webSocket<any>(
//     "ws://thewebsocketurl"
//   );
  
let priceWebsocket: WebSocket = new WebSocket("ws://localhost:8999");
  
const connectPriceEpic = (action$: any, store: Store) =>
    action$.ofType(PriceActionCreators.connectToPriceServer.type)
        .mergeMap( (action: any) => {
            if (!priceWebsocket || priceWebsocket.CLOSED) {
                let ob = rx.Observable.create(
                    (obs: rx.Observer<any>) => {
                        priceWebsocket.onopen = (ev: Event) => {
                            obs.next(PriceActionCreators.priceServerStatus.create('CONNECTED'));
                        }
                        priceWebsocket = new WebSocket("ws://localhost:8999");                        
                        return priceWebsocket.close.bind(priceWebsocket);
                    }
                );
                return ob;
            }
            if (priceWebsocket.OPEN) {
                return rx.Observable.of(PriceActionCreators.priceServerStatus.create('CONNECTED'));
            } else if(priceWebsocket.CONNECTING) {
                return rx.Observable.of(PriceActionCreators.priceServerStatus.create('CONNECTING'));
            }

        });

const subscribePriceEpic = (action$: any, store: Store) =>
    action$.ofType('SUBSCRIBE_PRICE')
        .mergeMap( (action: any) => {
            const { payload } = action;
            console.log('create obs');
            let ob = rx.Observable.create(
                (obs: rx.Observer<MessageEvent>) => {
                    priceWebsocket.onmessage = obs.next.bind(obs);
                    priceWebsocket.onerror = obs.error.bind(obs);
                    priceWebsocket.onclose = obs.complete.bind(obs);
                    return priceWebsocket.close.bind(priceWebsocket);
                }
            )
            .map((me: MessageEvent) => JSON.parse(me.data))
            .map(({ ticker, price } : any) => PriceActionCreators.PriceUpdate.create({ symbol : ticker, price }));
            console.log('ws send');
            priceWebsocket.send(payload);
            return ob;
        });

export const spotRatesEpics = combineEpics(
    subscribePriceEpic,
    connectPriceEpic
);
