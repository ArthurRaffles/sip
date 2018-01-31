import * as React from 'react';

import './component.css';
import PriceTileContainer, { Props as TileProps } from "../../price-tile-container/index";
import TenorSelectorContainer from '../../tenor-selector-container/index';
import { MonetaryInput } from '../../../components/monentary-input';

export interface Props {
    id: string;
    symbol: string;
    buy: TileProps;
    sell: TileProps;
    notional: number;
    onRemoveClick: (event: React.MouseEvent<HTMLInputElement>) => void;
    onNotionalChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const notionalClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
    event.preventDefault();
};

export const Ticket = (props: Props) => {
    const { id, symbol, buy, sell, notional, onRemoveClick, onNotionalChanged } = props;
     return (
        <form className='ticket'>
            <div className='ticket-title'>
                <span>{symbol} - {id}</span>
                <i className='fa fa-close close' onClick={onRemoveClick}></i>
            </div>
            <div className='ticket-prices' >
              <PriceTileContainer {...buy} />
              <PriceTileContainer {...sell} />
            </div>
            <TenorSelectorContainer ticketId={id} />
            <MonetaryInput value={notional} onChanged={onNotionalChanged} />
        </form>
    );
};
