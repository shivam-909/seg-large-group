import { render, screen } from '@testing-library/react';
import LoginPage from '../Components/LoginPage/LoginPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders Login Page', () => {
  render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
  // const signInTitle = screen.getAllByText("Sign in to your account");
  // expect(signInTitle).toBeInTheDocument();
});

test('make a login request and handle response', () => {
  // TODO: make a login request and handle response
});
