import { render, screen } from '@testing-library/react';
import { getByPlaceholderText } from '@testing-library/dom';
import { Location } from '../Components/ProfilePage/Location';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders Location Page', () => {
  render(<BrowserRouter><Routes><Route element={ <Location/> }/></Routes></BrowserRouter>);
});

// test('renders Location component with default location', () => {
//   const defaultLocation = 'London';
//   const { getByDisplayValue } =   render(<BrowserRouter><Routes><Route element={ <Location defaultLocation={defaultLocation}/> }/></Routes></BrowserRouter>);
//   const inputElement = getByDisplayValue(defaultLocation);
//   expect(inputElement).toBeInTheDocument();
// });
//
// test('calls handleChange method when input value is changed', () => {
//   const handleChange = jest.fn();
//   const { getByPlaceholderText } =   render(<BrowserRouter><Routes><Route element={ <Location onChange={handleChange}/> }/></Routes></BrowserRouter>);
//   const inputElement = getByPlaceholderText('Search City ...');
//   fireEvent.change(inputElement, { target: { value: 'Paris' } });
//   expect(handleChange).toHaveBeenCalled();
// });
//
// test('calls handleSelect method when a suggestion is selected', () => {
//   const handleSelect = jest.fn();
//   const { getByPlaceholderText } =   render(<BrowserRouter><Routes><Route element={ <Location handleSelect={handleSelect}/> }/></Routes></BrowserRouter>);
//   const inputElement = getByPlaceholderText('Search City ...');
//   inputElement.focus();
//   const suggestionElement = getByLabelText('Paris');
//   fireEvent.click(suggestionElement);
//   expect(handleSelect).toHaveBeenCalled();
// });
