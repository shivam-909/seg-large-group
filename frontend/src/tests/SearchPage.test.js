import React from 'react';
import { render , screen, fireEvent } from "@testing-library/react";
import SearchPage from "../Components/SearchPage/SearchPage";

describe('SearchPage', () => {
  it('displays job search results when valid inputs are entered',() => {
    render(<SearchPage />);
    const jobTitleInput = screen.getByPlaceholderText('Job title');
    const locationInput = screen.getByPlaceholderText('Location');
    const searchButton = screen.getByRole('button', {name: 'Search'});
    fireEvent.change(jobTitleInput, {target: {value:'Software Engineer'}});
    fireEvent.change(locationInput, {target: {value:'London, UK'}});
    fireEvent.click(searchButton);

  });

  test('displays error messages when inputs are invalid', () => {
    render(<SearchPage />);
    const searchButton = screen.getByRole('button', {name: 'Search'});
    fireEvent.click(searchButton);
    expect(screen.getByText(/Please enter a job title/)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a location/)).toBeInTheDocument();
  });
});