import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../Components/RegisterPage/RegisterPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";


test('renders RegisterPage component without crashing', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
});

  test('toggleRole function toggles visibility of Company-Fields and Seeker-Fields sections', () => {
    const { getByText, getByLabelText, queryByLabelText } = render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
    // Confirm that the Company-Fields section is not visible
    expect(queryByLabelText('Company name')).toBeNull();

    // Confirm that the Seeker-Fields section is visible
    expect(getByLabelText('First name')).toBeInTheDocument();
    expect(getByLabelText('Last name')).toBeInTheDocument();

    // Toggle role to Company
    fireEvent.click(getByText('Company'));

    // Confirm that the Company-Fields section is visible
    expect(getByLabelText('Company name')).toBeInTheDocument();

    // Confirm that the Seeker-Fields section is not visible
    expect(queryByLabelText('First name')).toBeNull();
    expect(queryByLabelText('Last name')).toBeNull();

    // Toggle role back to Job Seeker
    fireEvent.click(getByText('Job Seeker'));

    // Confirm that the Seeker-Fields section is visible
    expect(getByLabelText('First name')).toBeInTheDocument();
    expect(getByLabelText('Last name')).toBeInTheDocument();

    // Confirm that the Company-Fields section is not visible
    expect(queryByLabelText('Company name')).toBeNull();
  });


test('togglePasswordVisibility function toggles password visibility', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
  const passwordField = screen.queryByTestId('password');
  const confirmPassField = screen.queryByTestId('confirmPass');
  const eyeIcon = screen.getByAltText('toggle password');

  expect(passwordField.type).toBe('password');
  expect(confirmPassField.type).toBe('password');

  fireEvent.click(eyeIcon);

  expect(passwordField.type).toBe('text');
  expect(confirmPassField.type).toBe('text');

  fireEvent.click(eyeIcon);

  expect(passwordField.type).toBe('password');
  expect(confirmPassField.type).toBe('password');
});

test('checkPasswordMatch function validates passwords correctly', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
  const passwordField = screen.getByPlaceholderText("Password");
  expect(passwordField).toBeInTheDocument();
  const confirmPasswordField = screen.getByTestId('confirm-password');
  const errorText = screen.getByText('Passwords does not match');

  fireEvent.change(passwordField, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordField, { target: { value: 'password' } });

  expect(errorText).not.toBeVisible();

  fireEvent.change(confirmPasswordField, { target: { value: 'password1' } });

  expect(errorText).toBeVisible();
});
