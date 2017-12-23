
import * as React from 'react';
import * as SpotRateSelectors from '../../store/spot-rates/selectors';
import { RootState } from '../../store/index';
import { connect } from 'react-redux';
import { PriceActionCreators } from '../../store/spot-rates/actions';

// import { TickerPrice, SpotRate } from '../../store/spot-rates/reducer';
import { PriceTile } from './components/price-tile';
import { PriceType, PriceItem, Direction } from '../../definitions';

const mapStateToProps = (state: RootState, ownProps: any) => {
    const { symbol, priceType, handleClick, direction } = ownProps;
    const rate : PriceItem = SpotRateSelectors.getPrice(state)(symbol, priceType);

    return {
        handleClick,
        direction,
        ...rate
      };
};
  
const dispatchToProps = {
    subscribeToSpotRate: PriceActionCreators.subscribeToPriceUpdate.create
};

export interface Props extends PriceItem {
    handleClick: () => void;
    symbol: string;
    priceType: PriceType;
    direction: Direction;
}
type State = {};
class PriceTileContainer extends React.Component<Props, State> {

    render() {
        const props = { ...this.props };
        return (<PriceTile {...props} />);
    }
}

export default connect(mapStateToProps, dispatchToProps)(PriceTileContainer);
