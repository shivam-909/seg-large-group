import { render , screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SearchBar from "../Components/SearchPage/SearchBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe('SearchBar', () => {
  test('renders Search Bar', () => {
    render(<BrowserRouter><Routes><Route element={ <SearchBar/> }/></Routes></BrowserRouter>);
  });

  // it('renders the dropdown fields with options', () => {
  //   render(<BrowserRouter><Routes><Route element={ <SearchBar/> }/></Routes></BrowserRouter>);
  //   expect(screen.getByLabelText('Date')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Distance')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Salary')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Job Type')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Situation')).toBeInTheDocument();
  //
  //   expect(screen.getByLabelText('Date')).toHaveValue('None');
  //   expect(screen.getByLabelText('Distance')).toHaveValue('None');
  //   expect(screen.getByLabelText('Salary')).toHaveValue('None');
  //   expect(screen.getByLabelText('Job Type')).toHaveValue('None');
  //   expect(screen.getByLabelText('Situation')).toHaveValue('None');
  //
  //   userEvent.selectOptions(screen.getByLabelText('Date'),['3']);
  //   userEvent.selectOptions(screen.getByLabelText('Distance'),['10']);
  //   userEvent.selectOptions(screen.getByLabelText('Salary'),['75000']);
  //   userEvent.selectOptions(screen.getByLabelText('Job Type'),['Permanent']);
  //   userEvent.selectOptions(screen.getByLabelText('Situation'),['Remote']);
  //
  //   expect(screen.getByLabelText('Date')).toHaveValue('3');
  //   expect(screen.getByLabelText('Distance')).toHaveValue('10');
  //   expect(screen.getByLabelText('Salary')).toHaveValue('75000');
  //   expect(screen.getByLabelText('Job Type')).toHaveValue('Permanent');
  //   expect(screen.getByLabelText('Situation')).toHaveValue('Remote');
  //
  // });

});
