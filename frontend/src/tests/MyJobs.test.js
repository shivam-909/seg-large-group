const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import MyJobs from '../Components/MyJobs/MyJobs';
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe("MyJobs", () => {
  test('render MyJobs without crashing', () => {
    const { getByTestId } = render(<MyJobs />);
    const navbar = getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('render MyJobs without crashing', () => {
    const { getByText } = render(<MyJobs />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Interviews')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Archived')).toBeInTheDocument();
  });


});
