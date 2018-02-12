import sinon from 'sinon';

import { instrumentApi } from './instrumentService';

import { httpApi } from './http';

describe('InstrumentService.getInstruments callls fetch', () => {
    let stubHttp;
    let response;
    const url = 'http://localhost:8999/instruments';
    beforeEach(() => {
        stubHttp = sinon.stub(httpApi, 'fetch');
        stubHttp.resolves({
            json: sinon.stub()
        });
        instrumentApi.getInstruments()
            .then(data => response = data);
    });
    afterEach(() => {
        stubHttp.restore();
    })

    it('should call http fetch', () => {
        expect(stubHttp.called).toEqual(true);
    });

    it('should call http fetch with expected payload', () => {
        expect(stubHttp
            .calledWith(url, { method: 'GET' }))
        .toEqual(true);
    });
});
describe('InstrumentService.getInstruments response', () => {
    let stubHttp;
    let response;
    let jsonStub;
    beforeEach(() => {
        stubHttp = sinon.stub(httpApi, 'fetch');
        jsonStub = sinon.stub()
            .resolves({ foo: 'bar' })
        stubHttp.resolves({
            json: jsonStub
        });
        instrumentApi.getInstruments()
            .then(data => response = data);
    });
    afterEach(() => {
        stubHttp.restore();
    })

    it('should resolve payload', () => {
        expect(response)
        .toEqual({
            foo: 'bar'
        });
    });
});

describe('InstrumentService.saveInstruments', () => {
    let stubHttp;
    let response;
    const url = 'http://localhost:8999/instruments/add';
    beforeEach(() => {
        stubHttp = sinon.stub(httpApi, 'fetch');
        stubHttp.resolves();
        instrumentApi.saveInstruments(['foo', 'bar'])
            .then(data => response = data);
    });
    afterEach(() => {
        stubHttp.restore();
    })

    it('should call http fetch', () => {
        expect(stubHttp.called).toEqual(true);
    });

    it('should call http fetch with expected url', () => {
        expect(stubHttp
            .args[0][0]).toEqual(url);
    });
    it('should call http fetch with expected options', () => {
        expect(stubHttp.args[0][1]).toEqual({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors',
            body: JSON.stringify([{ ric: 'foo' }, { ric: 'bar' }]),
            method: 'POST'
        })
    });
});