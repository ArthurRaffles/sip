import * as sinon from 'sinon';
import {httpApi} from './http.api';
import {fetchMiddleware, FetchAction, FetchMode} from './fetch.middleware';

describe('fetchMiddleware', () => {
  // let store: any;
  let fetchStub: any;
  let action: any;
  let jsonStub: any;
  let nextSpy: any;
  beforeEach(() => {
    fetchStub = sinon.stub(httpApi, 'fetch');
    jsonStub = sinon.stub();

    fetchStub.resolves({
      json: jsonStub
    });

    nextSpy = sinon.spy();
    action = new FetchAction<any>(
      'GET_RICS', {
        url: 'instruments',
        mode: FetchMode.GET,
        responseType: 'GET_RICS_RESPONSE',
        errorType: 'GET_RICS_ERROR'
      });
  });
  afterEach(() => {
    fetchStub.restore();
  });
  describe('when fetch called with FetchAction', () => {
    it('should call fetch with url', () => {
      jsonStub.resolves({foo: 'barry'});
      fetchMiddleware({})(nextSpy)(action);
      expect(fetchStub.args[0][0])
        .toEqual('http://localhost:8999/instruments');
      expect(fetchStub.args[0][1])
        .toEqual({method: 'GET'})
    })
  });
  describe('when fetch request responds successfully', () => {
    it('should call next() with success action afsdfsd', (done) => {

      jsonStub.resolves({foo: 'barry'});
      const next = (act: any) => {
        expect(act)
          .toEqual({
            data: {foo: 'barry'},
            type: "GET_RICS_RESPONSE"
          });
        done();
      };
      fetchMiddleware({})(next)(action);
    })
  });
});
