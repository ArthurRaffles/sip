
import * as React from 'react';
import * as SpotRateSelectors from '../../store/spot-rates/selectors';
import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { PriceActionCreators } from '../../store/spot-rates/actions';
import { Ticket } from './components/ticket';
import { TickerPrice } from '../../store/spot-rates/reducer';

const mapStateToProps = (state: RootState, ticket: any) => {
    const { id, symbol } = ticket;
    const rate : TickerPrice = SpotRateSelectors.getSpotRate1(state)(symbol);
    return {
        ...rate,
        id
      };
};
  
const dispatchToProps = {
    subscribeToSpotRate: PriceActionCreators.subscribeToSpotRate.create
};

interface Props extends TickerPrice {
    id: string;
    subscribeToSpotRate: (symbol: string) => void;
}
type State = {};
class TicketContainer extends React.Component<Props, State> {

    handleSubscribe = () => {
        const { symbol, subscribeToSpotRate } = this.props;
        subscribeToSpotRate(symbol);
    }

    render() {
        const props = { ...this.props, handleSubscribe: this.handleSubscribe}
        return (<Ticket {...props} />);
    }
}

export default connect(mapStateToProps, dispatchToProps)(TicketContainer);
