import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import {BrowserRouter, Route, Routes} from "react-router-dom";


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

test('checkPasswordMatch function validates passwords correctly', () => {
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
    
    const errorText = screen.queryByTestId('confirmpw-input').getByText('Passwords do not match');
  
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
  
    waitFor(() => expect(errorText).not.toBeVisible());
  
    fireEvent.change(confirmPasswordInput, { target: { value: 'password1' } });
  
    waitFor(() => expect(errorText).toBeVisible());
});