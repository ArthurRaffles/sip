
import * as React from 'react';

import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { PriceActionCreators } from '../../store/spot-rates/actions';
import { TicketActionCreators } from '../../store/tickets/actions';
import { Ticket } from './components/ticket';
import { Props as TileProps } from "../price-tile-container/index";
import { PriceAccepted } from '../../definitions';
import { getTicket } from '../../store/tickets/selectors';
import { TicketUpdatePayload, Ticket as TicketData } from '../../store/tickets/reducer';

const mapStateToProps = (state: RootState, ownProps: any) => {
    const { id } = ownProps;
    const { notional = 0, symbol }: TicketData = getTicket(state)(id);
    return {
        id, notional, symbol
    }
};
  
const dispatchToProps = {
    subscribeToSpotRate: PriceActionCreators.subscribeToPriceUpdate.create,
    removeTicket: TicketActionCreators.removeTicket.create,
    updateTicket: TicketActionCreators.updateTicket.create
};

interface Props {
    id: string;
    symbol: string;
    notional: number;
    subscribeToSpotRate: (symbol: string) => void;
    removeTicket: (id: string) => void;
    updateTicket: (update: TicketUpdatePayload) => void;
}
type State = {};
class TicketContainer extends React.Component<Props, State> {

    componentDidMount() {
        const { symbol, subscribeToSpotRate } = this.props;
        subscribeToSpotRate(symbol);
    }

    handleRemove = (event: React.MouseEvent<HTMLInputElement>) => {
        const { id, removeTicket } = this.props;
        removeTicket(id);
    }

    handleChanged = (field: string) => ( { target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        console.warn('update', value);
        const { updateTicket, id } = this.props;
        const update: TicketUpdatePayload = { field, id, value };
        updateTicket(update);
    }

    defaultTicketProps() {
        const { symbol } = this.props;
        const buyClick = (accepted: PriceAccepted) => console.log(accepted);
        const sellClick = (accepted: PriceAccepted) => console.log(accepted);
        const buy: TileProps = { symbol, direction: 'buy', priceType: 'bid', onClick: buyClick };
        const sell: TileProps = { symbol, direction: 'sell', priceType: 'ask', onClick: sellClick };
        return {
            buy, sell
        }
    }

    render() {
        console.warn('rendering ticket', this.props);
        const ticketProps = {
            ...this.defaultTicketProps(),
            ...this.props,
            onRemoveClick: this.handleRemove,
            onNotionalChanged: this.handleChanged('notional')
        }
        return (<Ticket {...ticketProps} />);
    }
}

export default connect(mapStateToProps, dispatchToProps)(TicketContainer);
