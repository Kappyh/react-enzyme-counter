import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

// set up enzyme react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * Create the wrapper for the component
 * @function setup
 * @return {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, value)=> wrapper.find(`[data-test='${value}']`);

test('render wwithout test', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app');
  expect(appComponent.length).toBe(1);
});
test('renders a button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper,'increment-button');
  expect(button.length).toBe(1);
});
test("renders a counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test("counters starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");
});
test("clicking on a button increments a counter dislay", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
});
test("Should have a decrement button", ()=>{
  const wrapper = setup();
  const buttonDecrement = findByTestAttr(wrapper, 'decrement-button');
  expect(buttonDecrement.length).toBe(1);
});
test("Shouln't let the counter go below to zero",()=>{
  const wrapper = setup();
  const buttonDecrement = findByTestAttr(wrapper, 'decrement-button');
  const count = findByTestAttr(wrapper,'count').text();
  buttonDecrement.simulate('click');
  expect(count).toBe("0");
});
test("Should show a erro if try decrement 0",()=>{
  const wrapper = setup();
  const buttonDecrement = findByTestAttr(wrapper, 'decrement-button');
  buttonDecrement.simulate('click');
  const errorMessage = findByTestAttr(wrapper,'error-message').text();
  expect(errorMessage).toBe("Can decrement below to zero");
})
test("Should remove the error message if increment count", ()=>{
  const wrapper = setup();
  const buttonDecrement = findByTestAttr(wrapper,'decrement-button');
  buttonDecrement.simulate('click');
  const buttonIncrement = findByTestAttr(wrapper, 'increment-button');
  buttonIncrement.simulate('click');
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});