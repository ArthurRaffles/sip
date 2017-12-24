import * as React from 'react';
import './component.css';
import cx from 'classnames';

export interface Props {
  priceChange?: number;
}

export const PriceChange = (props: Props) => {
  const { priceChange = 0 } = props;

  const changeClass = cx({
    'fa fa-arrow-up change-up': priceChange >= 0,
    'fa fa-arrow-down change-down': priceChange < 0
  } );
  return (
    <i className={changeClass}></i>
  );
};
