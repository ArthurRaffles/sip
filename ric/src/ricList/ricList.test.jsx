
import React from 'react';
import ReactDOM from 'react-dom';
import { RicList } from './RicList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<RicList />', () => {
    it('should render' , () => {
        const wrapper = shallow(<RicList/>);
        expect(wrapper).not.toBe(null);
    });
    it('will render 3 items', () => {
        const rics = ['foo', 'bar', 'bt'];
        const wrapper = shallow(<RicList rics={rics}/>);
        expect(wrapper.find('li').length).toBe(3);
    });
    it('will render bar on second item', () => {
        const rics = ['foo', 'bar', 'bt'];
        const wrapper = shallow(<RicList rics={rics}/>);
        expect(wrapper.find('li').at(1).find('span').text()).toBe('bar');
    });
    it('will return deleted value', (done) => {
        const handleDelete = (inst) => {
            expect(inst).toBe('bar');
            done();
        };
        const rics = ['foo', 'bar', 'bt'];
        const wrapper = shallow(<RicList rics={rics} onDelete={handleDelete}/>);
        wrapper.find('li').at(1).find('button').simulate('click');
    });
});
