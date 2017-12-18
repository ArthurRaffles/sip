
import * as React from 'react';
import * as SpotRateSelectors from '../../store/spot-rates/selectors';
import { TickerPrice } from '../../store/spot-rates/reducer';
import { RootState } from '../../store/index';
import { PageHeader } from '../../components/page-header';
import { PageSection } from '../../components/page-section';
import { connect } from 'react-redux';
import { PriceActionCreators } from '../../store/spot-rates/actions';

const mapStateToProps = (state: RootState) => ({
    spotRate: SpotRateSelectors.subscribePrice(state)
  });
  
const dispatchToProps = {
    subscribeToPrice: PriceActionCreators.subscribeToPrice.create
};

interface Props {
    ticketId: string;
    spotRate: TickerPrice;
    subscribeToPrice: (symbol: string) => void;
}
type State = {};
class TicketContainer extends React.Component<Props, State> {

    // handleSubscribe() {
    //     const { subscribeToPrice } = this.props;
    //     subscribeToPrice('GBPEUR');
    // }
    render() {
        const { subscribeToPrice, spotRate: { symbol, price } } = this.props;
    
        const handleSubscribe = () => subscribeToPrice('GBPUSD')
        return (
          <article>
            <PageHeader>FX Ticket</PageHeader>
            <PageSection className="u-letter-box--xlarge">
            
                <div>{symbol}</div>
                <div>{price}</div>
                <button onClick={handleSubscribe} > subscribe </button>
            </PageSection>
          </article>
        );
      }
}

export default connect(mapStateToProps, dispatchToProps)(TicketContainer);
