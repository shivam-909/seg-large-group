const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import {render, screen, waitFor} from "@testing-library/react";
import { initialize } from "@googlemaps/jest-mocks";
import userEvent from '@testing-library/user-event';
import SearchBar from "../Components/SearchPage/SearchBar";

describe('SearchBar', () => {
  beforeEach(() => {
    initialize();
  });

  test('renders the dropdown fields with options', () => {
    const props = {
      defaultValue: "London",
      displayJobTitleInputErrorMessage: false,
      displayLocationInputErrorMessage: false,
      onLocationInputChange: jest.fn(),
      onJobTitleInputChange: jest.fn(),
      onclick: jest.fn(),
      OK: true,
      Location: {
        onChange: jest.fn(),
        disabled: false,
        defaultLocation: "London",
      },
    };
    render(
        <SearchBar {...props}/>
    );
    waitFor(() => {
      expect(screen.getByPlaceholderText('Job title')).toBeInTheDocument()
    });
    waitFor(() => {
      expect(screen.getByPlaceholderText('Search City...')).toBeInTheDocument()
    });

//     expect(screen.getByLabelText('Date')).toHaveValue('None');
//     expect(screen.getByLabelText('Distance')).toHaveValue('None');
//     expect(screen.getByLabelText('Salary')).toHaveValue('None');
//     expect(screen.getByLabelText('Job Type')).toHaveValue('None');
//     expect(screen.getByLabelText('Situation')).toHaveValue('None');
//
//     userEvent.selectOptions(screen.getByLabelText('Date'),['3']);
//     userEvent.selectOptions(screen.getByLabelText('Distance'),['10']);
//     userEvent.selectOptions(screen.getByLabelText('Salary'),['75000']);
//     userEvent.selectOptions(screen.getByLabelText('Job Type'),['Permanent']);
//     userEvent.selectOptions(screen.getByLabelText('Situation'),['Remote']);
//
//     expect(screen.getByLabelText('Date')).toHaveValue('3');
//     expect(screen.getByLabelText('Distance')).toHaveValue('10');
//     expect(screen.getByLabelText('Salary')).toHaveValue('75000');
//     expect(screen.getByLabelText('Job Type')).toHaveValue('Permanent');
//     expect(screen.getByLabelText('Situation')).toHaveValue('Remote');
//
//   });
//
//
//
// describe('SearchBar', () => {
//   it('renders the dropdown fields with options', () => {
//     render(<SearchBar />);
//     expect(screen.getByLabelText('Date')).toBeInTheDocument();
//     expect(screen.getByLabelText('Distance')).toBeInTheDocument();
//     expect(screen.getByLabelText('Salary')).toBeInTheDocument();
//     expect(screen.getByLabelText('Job Type')).toBeInTheDocument();
//     expect(screen.getByLabelText('Situation')).toBeInTheDocument();
//
//     expect(screen.getByLabelText('Date')).toHaveValue('None');
//     expect(screen.getByLabelText('Distance')).toHaveValue('None');
//     expect(screen.getByLabelText('Salary')).toHaveValue('None');
//     expect(screen.getByLabelText('Job Type')).toHaveValue('None');
//     expect(screen.getByLabelText('Situation')).toHaveValue('None');
//
//     userEvent.selectOptions(screen.getByLabelText('Date'),['3']);
//     userEvent.selectOptions(screen.getByLabelText('Distance'),['10']);
//     userEvent.selectOptions(screen.getByLabelText('Salary'),['75000']);
//     userEvent.selectOptions(screen.getByLabelText('Job Type'),['Permanent']);
//     userEvent.selectOptions(screen.getByLabelText('Situation'),['Remote']);
//
//     expect(screen.getByLabelText('Date')).toHaveValue('3');
//     expect(screen.getByLabelText('Distance')).toHaveValue('10');
//     expect(screen.getByLabelText('Salary')).toHaveValue('75000');
//     expect(screen.getByLabelText('Job Type')).toHaveValue('Permanent');
//     expect(screen.getByLabelText('Situation')).toHaveValue('Remote');
//
//   });
  });
});
