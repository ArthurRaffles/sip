
import * as React from 'react';

import './component.css';
import { Direction } from "../../../definitions";
import cx from 'classnames';

export interface Props {
  price: number;
  direction: Direction
}

export const PriceShape = (props: Props) => {
  const { price, direction } = props;
  const tileClass = cx('price-tile', direction );
  return (
    <svg className={tileClass} width="580" height="400" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
        <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
          <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%"/>
        </g>
      </g>
      <g>
        {price}
        <path stroke="#000" id="svg_2" d="m129.1485,106.1715l40.00001,0l0,27.61814c-20.00001,0 -20.00001,10.52302 -40.00001,4.54403l0,-32.16217z" strokeWidth="1.5" fill="#74556D"/>
      </g>
    </svg>
  );
};
