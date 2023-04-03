const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import {render, screen, waitFor} from "@testing-library/react";
import { initialize } from "@googlemaps/jest-mocks";
import userEvent from '@testing-library/user-event';
import SearchBar from "../Components/SearchPage/SearchBar";
import Filters from "../Components/SearchPage/Filters";
import { setupJestCanvasMock } from 'jest-canvas-mock';

describe('Filter', () => {
  beforeEach(() => {
    initialize();
    setupJestCanvasMock();
  });

  test('renders the dropdown fields with options', () => {
    const props = {
      jobs: [],
    };
    render(
        <Filters {...props}/>
    );
    waitFor(() => {expect(screen.getByLabelText('Date Posted')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Distance')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Salary')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Job type')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Workplace')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Industry')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Location')).toBeInTheDocument()});
    waitFor(() => {expect(screen.getByLabelText('Company')).toBeInTheDocument()});
  });

  test('renders the dropdown fields with options', () => {
    const props = {
      jobs: [],
    };
    render(
        <Filters {...props}/>
    );
    waitFor(() => {expect(screen.getByLabelText('Date Posted')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Distance')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Salary')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Job type')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Workplace')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Industry')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Location')).toHaveValue('None');});
    waitFor(() => {expect(screen.getByLabelText('Company')).toHaveValue('None');});
    });

    test('check if show filter button works', () => {
        const props = {
            jobs: [],
        };
        render(
            <Filters {...props}/>
        );
        waitFor(() => {expect(screen.getByText('Show filters')).toBeVisible()});
        userEvent.click(screen.getByText('Show filters'));
        // waitFor(() => {expect(screen.getByText('Hide filters')).toBeVisible()});
    });

    // test('clear filter button resets filters', () => {
    //     const props = {
    //         jobs: [],
    //     };
    //     render(
    //         <Filters {...props}/>
    //     );
    //     waitFor(() => {expect(screen.getByText('Show filters')).toBeVisible()});
    //     userEvent.click(screen.getByText('Show filters'));
    //     waitFor(() => {expect(screen.getByText('Hide filters')).toBeVisible()});
    //     userEvent.click(screen.getByText('Clear'));
    //     waitFor(() => {expect(screen.getByText('Show filters')).toBeVisible()});
    // });

    // test('snapshot test for setting filter', () => {
    //     const props = {
    //         jobs: [],
    //     };
    //     const {container} = render(
    //         <Filters {...props}/>
    //     );
    //     waitFor(() => {expect(screen.getByText('Show filters')).toBeVisible()});
    //     userEvent.click(screen.getByText('Show filters'));
    //     waitFor(() => {expect(screen.getByText('Hide filters')).toBeVisible()});
        // userEvent.selectOptions(screen.getByLabelText('Date Posted'),['3']);
        // userEvent.selectOptions(screen.getByLabelText('Distance'),['10']);
        // userEvent.selectOptions(screen.getByLabelText('Salary'),['75000']);
        // userEvent.selectOptions(screen.getByLabelText('Job type'),['Permanent']);
        // userEvent.selectOptions(screen.getByLabelText('Workplace'),['Remote']);
        // userEvent.selectOptions(screen.getByLabelText('Industry'),['Engineering']);
        // userEvent.selectOptions(screen.getByLabelText('Location'),['Toronto']);
        // userEvent.selectOptions(screen.getByRole("button", {name: 'Company'}),['Google']);
    //     expect(container).toMatchSnapshot();
    // });

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
