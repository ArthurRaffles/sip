
import * as React from 'react';
import { connect } from 'react-redux';

import * as SpotRateSelectors from '../../store/spot-rates/selectors';
import { RootState } from '../../store/index';
import { PriceTile } from './components/price-tile';
import { PriceType, PriceItem, Direction, PriceAccepted } from '../../definitions';

const mapStateToProps = (state: RootState, ownProps: any) => {
    const { symbol, priceType, handleClick, direction } = ownProps;
    const rate : PriceItem = SpotRateSelectors.getPrice(state)(symbol, priceType);

    return {
        handleClick,
        direction,
        ...rate
      };
};

export interface Props {
    onClick: (accepted: PriceAccepted) => void;
    symbol: string;
    priceType: PriceType;
    direction: Direction;
}
type State = {};
export class PriceTileContainer extends React.Component<Props & PriceItem, State> {

    handleClick = () => {
        const { price, priceType, onClick } = this.props;
        onClick({ price, priceType });
    }

    render() {
        const props = { ...this.props, onClick: this.handleClick }
        return (<PriceTile {...props} />);
    }
}

export default connect(mapStateToProps, {})(PriceTileContainer);
