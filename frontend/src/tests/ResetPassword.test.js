import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event'


test('renders ResetPassword page with email, password and confirm password fields', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      );
      const emailInput = screen.queryByTestId('email-input');
      const passwordInput = screen.queryAllByTestId('pw-input');
      const confirmPasswordInput = screen.queryAllByTestId('confirmpw-input');

      waitFor(() => expect(emailInput).toBeInTheDocument());
      waitFor(() => expect(emailInput).toHaveAttribute('type', 'email'));

      waitFor(() => expect(passwordInput).toBeInTheDocument());
      waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));

      waitFor(() => expect(confirmPasswordInput).toBeInTheDocument());
      waitFor(() => expect(confirmPasswordInput).toHaveAttribute('type', 'password'));

    });

test('checkPasswordMatch function shows error message with incorrect passwords inputs', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    );
    const passwordInput = screen.queryByTestId("pw-input");
    waitFor(() => expect(passwordInput).toBeInTheDocument());
    const confirmPasswordInput = screen.queryByTestId('confirmpw-input');
    const errorText = 'Passwords do not match';

    userEvent.type(passwordInput, 'test');
    userEvent.type(confirmPasswordInput, 'test2');

    waitFor(() => expect(passwordInput).toBeInTheDocument());
    waitFor(() => expect(confirmPasswordInput).toBeInTheDocument());
    waitFor(() => expect(errorText).toBeVisible());
});

test('checkPasswordMatch function does not show error message with correct passwords inputs', () => {
    render(
        <BrowserRouter>
            <Routes>
                <Route element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
    const passwordInput = screen.queryByTestId("pw-input");
    const confirmPasswordInput = screen.queryByTestId('confirmpw-input');
    const errorText = 'Passwords do not match';

    userEvent.type(passwordInput, 'test');
    userEvent.type(confirmPasswordInput, 'test');

    waitFor(() => expect(passwordInput).toBeInTheDocument());
    waitFor(() => expect(confirmPasswordInput).toBeInTheDocument());
    waitFor(() => expect(errorText).not.toBeVisible());
});