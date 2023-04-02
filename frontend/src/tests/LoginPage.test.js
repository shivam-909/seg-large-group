const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import LoginPage from '../Components/LoginPage/LoginPage';
import React from 'react';
import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// mock the axios.post method
jest.mock('axios');

describe('LoginPage component', () => {
  beforeEach(() => {
    render(
        <LoginPage/>
    );
  });
  test ('renders login form', () => {
    const loginForm = screen.getByText('Sign in to your account');
    waitFor(() => expect(loginForm).toBeInTheDocument());
  });

  test('renders email input', () => {
    const emailInput = screen.queryByTestId('email-input');
    waitFor(() => expect(emailInput).toBeInTheDocument());
    waitFor(() => expect(emailInput).toHaveAttribute('type', 'email'));
  });

  test('render password input', () => {
    const passwordInput = screen.queryByTestId('password-input');
    waitFor(() => expect(passwordInput).toBeInTheDocument());
    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
  });

  test('allows valid email input to pass', () => {
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234test@gmail.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234test@gmail.com'));
    waitFor(() => expect(screen.queryByTestId('error')).not.toBeInTheDocument());
  });

  //Invalid email input test cases
  test ('shows "Invalid email" when passing email input without an @', () => {
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234testgmail.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234testgmail.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when passing email input starting with an @', () => {
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('@12344.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when passing email address without a domain', () => {
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234@');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234@'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when attempting to pass an invalid email input starting with an @', () => {
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('@12344.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  //Testing the Remember Login checkbox
  test('renders rememberLogin checkbox component', () => {
    const rememberLogin = screen.queryByTestId('rememberLogin');
    waitFor(() => expect(rememberLogin).toBeInTheDocument());
    waitFor(() => expect(rememberLogin).not.toBeChecked());
  });

  test('toggles element when clicking the checkbox', () => {
    const rememberLogin = screen.queryByTestId('rememberLogin');
    userEvent.click(rememberLogin);

    waitFor(() => expect(screen.queryByTestId('rememberLogin')).toBeInTheDocument());
    waitFor(() => expect(rememberLogin).toBeChecked());

    userEvent.click(rememberLogin);

    waitFor(() => expect(screen.queryByTestId('rememberLogin')).toBeInTheDocument());
    waitFor(() => expect(rememberLogin).not.toBeChecked());
  });

  test('toggles password visibility', () => {
    const toggleEye = screen.getByAltText('');
    const passwordInput = document.getElementById("password");

    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));

    fireEvent.click(toggleEye);

    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'));

    fireEvent.click(toggleEye);

    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
  });
  
//Testing sign up page and forgot password link
  test("links with href value /signup", () => {
    waitFor(() => expect((screen.queryAllByTestId('signup-link')).getByRole('link',{name: 'Sign Up'})).toHaveAttribute('href', '/signup'));
  });

  test('submits login form', async () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = screen.getByText('Sign In');

    axios.post.mockResolvedValueOnce({
      data: {
        access: 'access_token',
        refresh: 'refresh_token',
      },
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test1234!' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}auth/login`, expect.any(FormData));
    });
  });
});


