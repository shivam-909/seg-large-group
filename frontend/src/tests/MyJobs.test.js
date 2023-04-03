const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import MyJobs from '../Components/MyJobs/MyJobs';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { getByText } from '@testing-library/dom';


describe('MyJobs component', () => {
  it('renders the component without crashing', () => {
    render(<MyJobs />);
  });

  it('renders the "My Jobs" heading', () => {
    render(<MyJobs />);
    const headingElement = screen.getByText(/My Jobs/i);
    expect(headingElement).toBeInTheDocument();
  });


  // it('changes the filter when a filter button is clicked', () => {
  //   render(<MyJobs />);
  //   const appliedFilterButton = screen.getByText('Applied');
  //   userEvent.click(appliedFilterButton);
  //   const appliedJobsElement = screen.getByText(/Applied Jobs/i);
  //   expect(appliedJobsElement).toBeInTheDocument();
  // });
  //
  // it('navigates to the add job page when the "Create Job" button is clicked', () => {
  //   const mockNavigate = jest.fn();
  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //     useNavigate: () => mockNavigate,
  //   }));
    //render(<MyJobs />);
    //const createJobButton = screen.getByText(/Create Job/i);
    //const createJobButton = screen.getByTestId('createJobButton');
    //const createJobButton = screen.getByRole('button', { name: /create job/i });
    //userEvent.click(createJobButton);
    //expect(mockNavigate).toHaveBeenCalledWith('add');
  //   const { getByText, getByTestId } = render(<MyJobs />);
  //   waitFor(() => {
  //     expect(getByText(/My Jobs/i)).toBeInTheDocument();
  //   });
  //
  //   const createJobButton = getByText('Create Job');
  //   userEvent.click(createJobButton);
  //   expect(mockNavigate).toHaveBeenCalledWith('add');
  // });

});
