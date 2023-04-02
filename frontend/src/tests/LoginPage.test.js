const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import {render, screen, waitFor} from '@testing-library/react';
import LoginPage from '../Components/LoginPage/LoginPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders Login Page', () => {
  render(<LoginPage/>);
  const signInTitle = screen.getAllByText("Sign in to your account");
  waitFor(() => expect(signInTitle).toBeInTheDocument());
});

test('make a login request and handle response', () => {
  // TODO: make a login request and handle response
});
