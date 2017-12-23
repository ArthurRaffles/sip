import * as React from 'react';

import './component.css';
import PriceTileContainer, { Props as TileProps } from "../../price-tile-container/index";
import { TickerPrice } from '../../../store/spot-rates/reducer';
export interface Props extends TickerPrice {
    id: string;
    symbol: string;
    handleSubscribe: () => void;
}

export const Ticket = (props: Props) => {
    const { id, symbol, handleSubscribe } = props;
    const buyClick = () => console.log('buy');
    const sellClick = () => console.log('sell');
    const buy: TileProps = { symbol, direction: 'buy', priceType: 'bid', price: 0, priceChange: 0, handleClick: buyClick };
    const sell: TileProps = { symbol, direction: 'sell', priceType: 'ask', price: 0, priceChange: 0, handleClick: sellClick };
    return (
        <div className='ticket'>
            <div>FX Ticket {id}</div>
            <div>{symbol}</div>
            <div className='ticket-prices' >
              <PriceTileContainer {...buy} />
              <PriceTileContainer {...sell} />
            </div>
            <button onClick={handleSubscribe} > subscribe </button>
        </div>
    );
};
