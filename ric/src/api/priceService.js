import { setInterval } from "timers";
import { socket } from './socket';
let ws;
export const api = {
    getPrice: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    ccyPair: 'GBPUSD',
                    price: Math.random() * 120
                });
            }, 500);
    
        })
    },
    subscribePrice: (instrument, callback) => {
        if (!ws) {
            ws = socket("ws://localhost:8999");
        }
       
        ws.onmessage = ev => {
            console.warn('in onmessage', ev.data)
            const data = JSON.parse(ev.data);
            callback({
                ccyPair: data.ticker,
                price: data.bid
            });
        };
        ws.onopen = (ev) => {
           ws.send(instrument);
        }
    }
};