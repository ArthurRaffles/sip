import * as React from 'react';
import Up from 'react-icons/go/arrow-up';
import Down from 'react-icons/go/arrow-down';

import './component.css';
import { Direction } from "../../../definitions";
import cx from 'classnames';

export interface Props {
  price: number;
  direction: Direction
  handleClick: () => void;
}

export const PriceTile = (props: Props) => {
  const { price, direction, handleClick } = props;
  const tileClass = cx('price-tile', direction );
  return (
    <div className={tileClass} onClick={handleClick}>
      <span className='price-title'>{direction}</span>
      <span >{price}</span>
    </div>
  );
};
