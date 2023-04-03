import React from 'react';
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import JobPage from "../Components/JobPage/JobPage";
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
test('renders JobPage page', () => {
    render(
      <JobPage/>
    );
  });

test ('renders navbar', () => {
    render(
        <JobPage/>);

    const navBar = screen.queryByTestId('navbar');
    waitFor(() => expect(navBar).toBeInTheDocument());
});