import * as React from 'react';
export interface Props {
    id: string;
    symbol: string;
    price: number;
    handleSubscribe: () => void;
}

export const Ticket = (props: Props) => {
    const { id, symbol, price , handleSubscribe } = props;
    return (
        <div>
            <div>FX Ticket {id}</div>
            <div>{symbol}</div>
            <div>{price}</div>
            <button onClick={handleSubscribe} > subscribe </button>
        </div>
    );
};
