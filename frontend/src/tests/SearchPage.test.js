import React from 'react';
import { render , screen } from "@testing-library/react";
import SearchPage from "../Components/SearchPage/SearchPage";

describe('SearchPage', () => {
  it('renders SearchBar components',() => {
    render(<SearchPage />);
    expect(screen.getByPlaceholderText('What')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Where')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });
});
