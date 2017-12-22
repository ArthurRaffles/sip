import * as React from 'react';

import './component.css';
import { PriceTile, Props as TileProps } from "./price-tile";
export interface Props {
    id: string;
    symbol: string;
    price: number;
    handleSubscribe: () => void;
}

export const Ticket = (props: Props) => {
    const { id, symbol, price , handleSubscribe } = props;
    const buyClick = () => console.log('buy');
    const sellClick = () => console.log('buy');
    const buy: TileProps = { price, direction: 'buy', handleClick: buyClick };
    const sell: TileProps = { price, direction: 'sell', handleClick: sellClick };
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
