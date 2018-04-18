import React from 'react';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import {RicView} from './ricView';
import {RicList} from '../ricList/ricList';
import {RicSelector} from '../ric/ricSelector';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {api} from '../api/priceService';
import {instrumentApi} from '../api/instrumentService';

Enzyme.configure({adapter: new Adapter()});

describe('<RicView />', () => {
	let subsMock;
	let getInstrumentsStub;
	let saveInstrumentStub;
	beforeEach(() => {
		subsMock = sinon.stub(api, 'subscribePrice');
		getInstrumentsStub = sinon.stub(instrumentApi, 'getInstruments');
		getInstrumentsStub.resolves([]);

		saveInstrumentStub = sinon.stub(instrumentApi, 'saveInstruments');

	});

	afterEach(() => {
		subsMock.restore();
		getInstrumentsStub.restore();
		saveInstrumentStub.restore();
	});

	describe('<RicView />', () => {

		it('should render', () => {
			const wrapper = shallow(<RicView/>);
			expect(wrapper).not.toBe(null);
		});
		it('should render ricList', () => {
			const wrapper = shallow(<RicView/>);
			expect(wrapper.find(RicList)).not.toBe(null);
		});
		it('should render ricSelector', () => {
			const wrapper = shallow(<RicView/>);
			expect(wrapper.find(RicSelector)).not.toBe(null);
		});
		it('should add ric to state when added', () => {
			const wrapper = shallow(<RicView/>);
			wrapper.find(RicSelector).simulate('save', 'bar');
			expect(wrapper.update().state('rics')).toEqual(['bar']);
		});
		it('should fetch instruments', () => {
			const wrapper = shallow(<RicView/>);
			expect(getInstrumentsStub.called).toEqual(true);
		});

	});
	describe('when FETCH calls back', () => {
		let wrapper;
		beforeEach(() => {
			global.fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve([
					{ric: 'BP'},
					{ric: 'BT'},
					{ric: 'BARC'}
				])
			});
			// getInstrumentsStub.resolves([
			// 	{ric: 'BP'},
			// 	{ric: 'BT'},
			// 	{ric: 'BARC'}
			// ]);
			wrapper = shallow(<RicView/>);
		});

		it('should set state to be 3 instruments', () => {
			expect(wrapper.state('rics').length).toBe(3);
		});
		it('should set state to be  expected', () => {
			expect(wrapper.state('rics')).toEqual([
				'BP',
				'BT',
				'BARC'
			]);
		});
	});
	describe('when instrumentService calls back', () => {
		let wrapper;
		beforeEach(() => {
			getInstrumentsStub.resolves([
				{ric: 'BP'},
				{ric: 'BT'},
				{ric: 'BARC'}
			]);
			wrapper = shallow(<RicView/>);
		});

		it('should set state to be 3 instruments', () => {
			expect(wrapper.state('rics').length).toBe(3);
		});
		it('should set state to be  expected', () => {
			expect(wrapper.state('rics')).toEqual([
				'BP',
				'BT',
				'BARC'
			]);
		});
	});
	describe('INTEGRATION when instrumentService calls back', () => {
		let wrapper;
		beforeEach(() => {
			getInstrumentsStub.resolves([
				{ric: 'BP'},
				{ric: 'BT'},
				{ric: 'BARC'}
			]);
			wrapper = mount(<RicView/>);
		});

		it('should render 3 instruments as <li/>', () => {
			expect(wrapper.update().find('li').length).toEqual(3);
		});
		it('should set render third item as BARC', () => {
			expect(wrapper.update()
				.find('li').at(2).find('span').text()).toEqual('BARC');
		});
	});
	describe('INTEGRATION - when adding and deleting', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = mount(<RicView/>);
			wrapper.find('#ricInput').simulate('change', {
				target: {value: 'foo'}
			});
			wrapper.find('#save').simulate('click');
			wrapper.find('#ricInput').simulate('change', {
				target: {value: 'TESCO'}
			});
			wrapper.find('#save').simulate('click');
		});
		it('should render ric when added', () => {
			expect(wrapper.find('li').length).toBe(2);
		});
		it('should render foo when added', () => {
			expect(wrapper.find('li').at(0).find('span').text()).toBe('foo');
		});
		it('should remove ric when deleted', () => {
			expect(wrapper.find('li').length).toBe(2);

			wrapper.find('li').at(0).find('#delete').simulate('click');
			expect(wrapper.find('li').length).toBe(1);
			expect(wrapper.find('li').at(0).find('span').text()).toBe('TESCO');
		});

	});
	describe('when saving all', () => {
		let wrapper;
		beforeEach(() => {
			saveInstrumentStub.resolves({});
			wrapper = shallow(<RicView/>);
			wrapper.instance().handleSave('TESCO');
			wrapper.instance().handleSave('barc');
			wrapper.find('#saveAll').simulate('click');
		});
		it('should call instrumentApi.saveInstrument', () => {
			expect(saveInstrumentStub.called).toEqual(true);
		});
		it('should call instrumentApi.saveInstrument with TESCO', () => {
			expect(saveInstrumentStub.args[0][0])
				.toEqual(['TESCO', 'barc']);
		});
		describe('when api returns success', () => {
			it('should call instrumentApi.saveInstrument', () => {
				expect(wrapper.state('error'))
					.toEqual('');
			});
		});

	});
	describe('when api rejects', () => {
		let wrapper;
		beforeEach(() => {
			saveInstrumentStub.rejects({error: 'foo'});
			wrapper = shallow(<RicView/>);
			wrapper.instance().handleSave('TESCO');
			wrapper.instance().handleSave('barc');
			wrapper.find('#saveAll').simulate('click');
		});

		it('should call instrumentApi.saveInstrument', () => {
			expect(wrapper.update().state('error'))
				.toEqual('foo');
		});
	});
	describe('when fetching single price (promise)', () => {
		let priceMock;
		let wrapper;
		beforeEach(() => {
			priceMock = sinon.stub(api, 'getPrice');

			priceMock.resolves({
				ccyPair: 'GBPUSD',
				price: 12.32
			});
			wrapper = shallow(<RicView/>);
		});

		it('should render price', () => {
			expect(wrapper.update().find('#single').text()).toBe("GBPUSD: 12.32");
		});
		afterEach(() => {
			subsMock.restore();
			priceMock.restore();
		});
	});
	describe('when subscribing price updates', () => {
		let wrapper;
		beforeEach(() => {
			subsMock.yields({
				ccyPair: 'GBPUSD',
				price: 12.33
			});
			wrapper = shallow(<RicView/>);
		});
		it('should render price', () => {
			expect(wrapper.update().find('#price').text()).toBe("12.33: GBPUSD");
		});
	});
});

