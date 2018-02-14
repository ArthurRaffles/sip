import * as sinon from 'sinon';
import { httpApi } from './http.api';
import { fetchMiddleware, FetchAction, FetchMode } from './fetch.middleware';
import {Action} from "../../types/app";

describe('fetchMiddleware', () => {
   // let store: any;
    let fetchStub: any;
    let action: any;
  let nextAction: any;
  let jsonStub: any;
    let nextSpy: any;
    beforeEach(() => {
        fetchStub = sinon.stub(httpApi, 'fetch');
     //   console.warn(fetchStub);
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
        const next = (act: Action) => {
          console.warn('next!!', act);
          nextAction = act;
        };
      jsonStub.resolves({ foo: 'barry' });
        fetchMiddleware({})(nextSpy)(action);

    });
    afterEach(() => {
        fetchStub.restore();
    });
    describe('when fetch called with FetchAction', () => {
        it('should call fetch with url', () => {
            // fetchMiddleware({})((act: any) =>{})(action);
            // console.warn('stub', fetchStub);
            expect(fetchStub.args[0][0])
                .toEqual('http://localhost:8999/instruments');
            expect(fetchStub.args[0][1])
                .toEqual({ method: 'GET' })
        })
    });
    describe('when fetch request responds successfully', () => {


      it('should call next() with success action afsdfsd', () => {

        expect(nextSpy.called).toEqual(true);
        // expect(nextAction)
        //   .toEqual({
        //     CALL_API: "CALL_API",
        //     payload: {
        //       "errorType": "GET_RICS_ERROR",
        //       "mode": 0,
        //       "responseType": "GET_RICS_RESPONSE",
        //       "url": "instruments"
        //     }, "type": "GET_RICS"
        //   })

      })
    });
});
