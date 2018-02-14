import React from 'react';
import { expect } from 'chai';
import { shallow  } from 'enzyme';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { PriceTile, Props } from './price-tile';
import { PriceChange } from './price-change';


xdescribe('<PriceTile />', () => {
  let props: Props;
  let wrapper: any;
  beforeEach(() => {
    props = {
      price: 12,
      priceChange: -0.023,
      direction: 'buy',
      onClick : sinon.spy()
    };
    wrapper = shallow (<PriceTile {...props} />);
  });
  it('calls componentDidMount', () => {
    expect(wrapper).to.be.not.null;
  });
  it('should render <PriceChange/>', () => {
    expect(wrapper.find(PriceChange)).to.have.length(1);
  });
  it('should render direction', () => {
    expect(wrapper.contains(<span className="price-title" >buy</span>)).to.be.true;
  });
  it('should render buy class', () => {
    expect(wrapper.hasClass('buy')).to.be.true;
  });
  it('should call onClick when clicked', () => {
    wrapper.find('#priceTile').simulate('click');
    expect(props.onClick).to.have.property('callCount', 1);
  });
});
