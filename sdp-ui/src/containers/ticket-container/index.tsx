
import * as React from 'react';

import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { PriceActionCreators } from '../../store/spot-rates/actions';
import { Ticket } from './components/ticket';
import { Props as TileProps } from "../price-tile-container/index";
import { PriceAccepted } from '../../definitions';
import { getTenors } from '../../store/static/selectors';

const mapStateToProps = (state: RootState, ownProps: any) => {
    const tenors = getTenors(state);
    return {
        tenors
    }
};
  
const dispatchToProps = {
    subscribeToSpotRate: PriceActionCreators.subscribeToPriceUpdate.create
};

interface Props {
    id: string;
    symbol: string;
    tenors: string[];
    subscribeToSpotRate: (symbol: string) => void;
}
type State = {};
class TicketContainer extends React.Component<Props, State> {

    componentDidMount() {
        const { symbol, subscribeToSpotRate } = this.props;
        subscribeToSpotRate(symbol);
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
            ...this.props
        }
        return (<Ticket {...ticketProps} />);
    }
}

export default connect(mapStateToProps, dispatchToProps)(TicketContainer);
