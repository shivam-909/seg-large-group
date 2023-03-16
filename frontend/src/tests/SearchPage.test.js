import React from 'react';
import { render , screen } from "@testing-library/react";
import SearchPage from "../Components/SearchPage/SearchPage";

describe('SearchPage', () => {
  it('renders Navbar and SearchBar components',() => {
    render(<SearchPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Where')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });
});
