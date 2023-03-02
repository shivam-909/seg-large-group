import { render, screen } from "@testing-library/react";

import SearchBar from "./Components/SearchPage/SearchBar";

describe('SearchBar', () => {
  it('renders the input fields and search button', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('What')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Where')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });

  it('renders the dropdown fields with options', () => {
    render(<SearchBar />);
    expect(screen.getByLabeltext('Date')).toBeInTheDocument();
    expect(screen.getByLabeltext('Distance')).toBeInTheDocument();
    expect(screen.getByLabeltext('Salary')).toBeInTheDocument();
    expect(screen.getByLabeltext('Job Type')).toBeInTheDocument();
    expect(screen.getByLabeltext('Situation')).toBeInTheDocument();

    expect(screen.getByLabeltext('Date')).toHaveValue('None');
    expect(screen.getByLabeltext('Distance')).toHaveValue('None');
    expect(screen.getByLabeltext('Salary')).toHaveValue('None');
    expect(screen.getByLabeltext('Job Type')).toHaveValue('None');
    expect(screen.getByLabeltext('Situation')).toHaveValue('None');

    userEvent.selectOptions(screen.getByLabelText('Date'),['3']);
    userEvent.selectOptions(screen.getByLabelText('Distance'),['10']);
    userEvent.selectOptions(screen.getByLabelText('Salary'),['75000']);
    userEvent.selectOptions(screen.getByLabelText('Job Type'),['Permanent']);
    userEvent.selectOptions(screen.getByLabelText('Situation'),['Remote']);

    expect(screen.getByLabeltext('Date')).toHaveValue('3');
    expect(screen.getByLabeltext('Distance')).toHaveValue('10');
    expect(screen.getByLabeltext('Salary')).toHaveValue('75000');
    expect(screen.getByLabeltext('Job Type')).toHaveValue('Permanent');
    expect(screen.getByLabeltext('Situation')).toHaveValue('Remote');

  });

});
