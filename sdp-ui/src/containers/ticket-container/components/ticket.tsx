import * as React from 'react';

import './component.css';
import { PriceTile, Props as TileProps } from "./price-tile";
import { TickerPrice } from '../../../store/spot-rates/reducer';
export interface Props extends TickerPrice {
    id: string;
    handleSubscribe: () => void;
}

export const Ticket = (props: Props) => {
    const { id, symbol, price , priceChange, handleSubscribe } = props;
    const buyClick = () => console.log('buy');
    const sellClick = () => console.log('sell');
    const buy: TileProps = { price, priceChange, direction: 'buy', handleClick: buyClick };
    const sell: TileProps = { price, priceChange, direction: 'sell', handleClick: sellClick };
    return (
        <div className='ticket'>
            <div>FX Ticket {id}</div>
            <div>{symbol}</div>
            <div className='ticket-prices' >
              <PriceTile {...buy} />
              <PriceTile {...sell} />
            </div>
            <button onClick={handleSubscribe} > subscribe </button>
        </div>
    );
};
