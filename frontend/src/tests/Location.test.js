import { render, screen } from '@testing-library/react';
import { Location } from '../Components/ProfilePage/Location';
import {BrowserRouter, Route, Routes} from "react-router-dom";


test('renders Location Page', () => {
  render(<BrowserRouter><Routes><Route element={ <Location/> }/></Routes></BrowserRouter>);
});

test('renders Location component with default location', () => {
  const defaultLocation = 'London';

  const { getByDisplayValue } =   render(<BrowserRouter><Routes><Route element={ <Location defaultLocation={defaultLocation}/> }/></Routes></BrowserRouter>);


  render(<Location defaultLocation={defaultLocation} />);
  const inputElement = getByDisplayValue(defaultLocation);
  expect(inputElement).toBeInTheDocument();
});

test('calls handleChange method when input value is changed', () => {
  const handleChange = jest.fn();
  const { getByLabelText } = render(<Location onChange={handleChange} />);
  const inputElement = getByLabelText('Search City ...');
  fireEvent.change(inputElement, { target: { value: 'Paris' } });
  expect(handleChange).toHaveBeenCalled();
});

test('calls handleSelect method when a suggestion is selected', () => {
  const handleSelect = jest.fn();
  const { getByLabelText } = render(<Location handleSelect={handleSelect} />);
  const inputElement = getByLabelText('Search City ...');
  inputElement.focus();
  const suggestionElement = getByLabelText('Paris');
  fireEvent.click(suggestionElement);
  expect(handleSelect).toHaveBeenCalled();
});
