import * as React from 'react';
import './component.css';
import cx from 'classnames';

export interface Props {
  priceChange: number | 0;
}

export const PriceChange = (props: Props) => {
  const { priceChange } = props;

  const changeClass = cx('fa', {
    'fa-arrow-up change-up': priceChange > 0,
    'fa-arrow-down change-down': priceChange < 0
  } );
  return (
    <i className={changeClass}></i>
  );
};
