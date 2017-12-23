import * as React from 'react';
import './component.css';
import { Direction } from "../../../definitions";
import cx from 'classnames';
import { PriceChange } from './price-change';

export interface Props {
  price: number;
  priceChange: number;
  direction: Direction;
  handleClick: () => void;
}

export const PriceTile = (props: Props) => {
  const { price, priceChange, direction, handleClick } = props;
  // const priceChange = 

  const tileClass = cx('price-tile', direction );
  return (
    <div className={tileClass} onClick={handleClick}>
      <span className='price-title'>{direction}</span>
      <span >{price} <PriceChange priceChange={priceChange} /></span>
      
    </div>
  );
};
