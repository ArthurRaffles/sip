
import sinon from 'sinon';
import reducer, { TicketUpdatePayload, TicketsState } from './reducer';
import { TicketActionCreators } from './actions';
import { ticketsUtils } from './utils';

describe('tickets/reducer spec', () => {
    let state: TicketsState;
    let utilsStub: any;
    beforeEach(() => {
        utilsStub = sinon.stub(ticketsUtils, 'nextId');
    });
    afterEach(() => {
        utilsStub.restore();
    })
    describe('when adding ticket', () => {
        it('should add ticket', () => {
            let action = {
                type: TicketActionCreators.addTicket.type,
                payload: 'GBPUSD'
            };
            utilsStub.returns(12);
            state = reducer(undefined, action );
            expect(state).toEqual({
                't12' : {
                    id: 't12',
                    symbol: 'GBPUSD'
                }
            })
        })
    });
});