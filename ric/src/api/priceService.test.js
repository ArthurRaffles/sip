import sinon from 'sinon';
import { api } from './priceService';
import * as sock from './socket';

describe('priceService', () => {
    let priceMock;
    let subsMock;
    let wrapper;
    let dummySocket;
    let cb;
    let sendSpy;
    let WebSocket;
    let mockServer;
    sendSpy = sinon.spy();
    dummySocket = {
      onmessage: (f) => {},
      onopen:() => {},
      send: sendSpy
    };
    subsMock = sinon.stub(sock, 'socket').returns(dummySocket);
    cb = sinon.spy();

    beforeEach(() => {
      api.subscribePrice('EURUSD', cb);
    });

    it('should callback with expected payload', () => {
      dummySocket.onmessage({
        data: JSON.stringify({
          ticker: 'foo',
          bid: 1
        })
      });
      expect(cb.calledWith({
        ccyPair: 'foo',
        price: 1
      })).toEqual(true);
    });
    it('should call send onopen', () => {
      dummySocket.onopen();
      expect(sendSpy.called).toEqual(true);

    });
    it('should call send with instrument onopen', () => {
      dummySocket.onopen();
      expect(sendSpy.calledWith('EURUSD')).toEqual(true);

    });
});