
import React from 'react';
import ReactDOM from 'react-dom';
import { RicSelector } from './ricSelector';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<RicSelector />', () => {
    it('should render' , () => {
        const wrapper = shallow(<RicSelector/>);
        expect(wrapper).not.toBe(null);
    });
    it('will return entered value', (done) => {
        const handleChange = (inst) => {
            expect(inst).toBe('foo');
            done();
        };
        const wrapper = shallow(<RicSelector onSave={handleChange}/>);
        wrapper.find('#ricInput').simulate('change', {
            target: {
                value: 'foo'
            }
        });
        wrapper.find('#save').simulate('click');
    });
});
