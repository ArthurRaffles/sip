import sinon from 'sinon';
import { httpApi } from './http.api';
import { fetchMiddleware, FetchAction, FetchMode } from './fetch.middleware';

describe('fetchMiddleware', () => {
    let store: any;
    let httpStub: any;
    let action: any;
    beforeEach(() => {
        httpStub = sinon.stub(httpApi, 'fetch');
        action = new FetchAction<any>(
            'GET_RICS', 'GET_RICS_RESPONSE', {
                url: 'instruments',
                mode: FetchMode.GET
            });
    });
    afterEach(() => {
        httpStub.restore();
    })
    describe('when fetch called with FetchAction', () => {
        it('should call fetch with url', () => {
            fetchMiddleware({})((act: any) =>{})(action);
            expect(httpStub.fetch.args[0][0])
                .toEqual('http://localhost:8999/instruments')
            expect(httpStub.fetch.args[0][1])
                .toEqual({ method: 'GET' })
        })
    });
})