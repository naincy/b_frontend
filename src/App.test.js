import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';

import Adapter from 'enzyme-adapter-react-16';
import App from './App';
 
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
 
import Footer from './components/Footer';
import Header from './components/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('APP Loading.... Check', () => {
	it('Invoking App ..', () => {
		const wrapper = shallow(<App />);
	 
	});

	it('Check weather Foooter component is render or not', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });



  it('Check weather Login component is render or not', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Login)).to.have.lengthOf(0);
  });
  

  it('Header component will not render Without login!!!', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Header)).to.have.lengthOf(0);
	});


 
  it('Dashboard component will not render Without login!!!', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Dashboard)).to.have.lengthOf(0);
	});


});
