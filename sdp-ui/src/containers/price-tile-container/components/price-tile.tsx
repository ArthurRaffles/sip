import * as React from 'react';
import './component.css';
import { Direction } from "../../../definitions";
import cx from 'classnames';
import { PriceChange } from './price-change';

export interface Props {
  price?: number;
  priceChange?: number;
  direction: Direction;
  onClick: () => void;
}

export const PriceTile = (props: Props) => {
  const { price, priceChange = 0, direction, onClick } = props;
  const tileClass = cx('price-tile', direction );
  return (
    <div className={tileClass} onClick={onClick}>
      <span className='price-title'>{direction}</span>
      <span >{price} <PriceChange priceChange={priceChange} /></span>
    </div>
  );
};
