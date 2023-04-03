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
});
