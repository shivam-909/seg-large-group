import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import {BrowserRouter, Route, Routes} from "react-router-dom";

test('renders forgot password page', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  });
  
  test('render email input', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  
    const emailInput = screen.queryByTestId('email-input');
    const button = screen.queryByTitle('submit-button');

    waitFor(() => expect(emailInput).toBeInTheDocument());
    waitFor(() => expect(emailInput).toHaveAttribute('type', 'email'));

    waitFor(() => expect(button).toBeInTheDocument());
    waitFor(() => expect(button).toHaveAttribute('type', 'button'));
  });