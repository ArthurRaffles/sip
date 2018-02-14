import React from 'react';
import { expect } from 'chai';
import { mount  } from 'enzyme';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { PriceTileContainer, Props} from './index';
import { PriceTile } from './components/price-tile';
import { PriceAccepted, PriceItem } from "../../definitions";


xdescribe('<PriceTileContainer />', () => {
  let props: Props & PriceItem;
  let wrapper: any;
  beforeEach(() => {
    props = {
      symbol: 'gbp',
      priceType: 'bid',
      direction: 'buy',
      price: 12,
      previousPrice: 13.1,
      priceChange: 1.1,
      onClick : sinon.spy()
    };
    wrapper = mount (<PriceTileContainer {...props} />);
  });
  it('calls componentDidMount', () => {
    expect(wrapper).to.be.not.null;
  });
  it('should render <PriceChange/>', () => {
    expect(wrapper.find(PriceTile)).to.have.length(1);
  });
  it('should call on click when priceTile clicked', () => {
    wrapper.find('#priceTile').simulate('click');
    expect(props.onClick).to.have.property('callCount', 1);
  });
  it('should return price and priceType when clicked', () => {
    let response;
    const newProps = {
      ...props,
      onClick: (v: PriceAccepted) => response = v
    };
    wrapper = mount (<PriceTileContainer {...newProps} />);
    wrapper.find('#priceTile').simulate('click');
    expect(response).to.deep.equal({
      price: 12,
      priceType: 'bid'
    });
  });
  // it('should render direction', () => {
  //   expect(wrapper.contains(<span className="price-title" >buy</span>)).to.be.true;
  // });
  // it('should render buy class', () => {
  //   expect(wrapper.hasClass('buy')).to.be.true;
  // });
  // it('should call onClick when clicked', () => {
  //   wrapper.find('#priceTile').simulate('click');
  //   expect(props.onClick).to.have.property('callCount', 1);
  // });
});
