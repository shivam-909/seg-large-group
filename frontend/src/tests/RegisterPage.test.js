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
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
  const seekerFields = screen.getByRole('searcher', hidden: true});
  const companyFields = screen.getByRole('company', hidden: true});

  expect(seekerFields).toHaveClass('hidden');
  expect(companyFields).not.toHaveClass('hidden');
  fireEvent.click(companyFields);
  expect(seekerFields).not.toHaveClass('hidden');
  expect(companyFields).toHaveClass('hidden');
});

test('togglePasswordVisibility function toggles password visibility', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
  const passwordField = screen.getByTestId('password');
  const confirmPassField = screen.getByTestId('confirmPass');
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
  const passwordField = screen.getByTestId("password");
  expect(passwordField).toBeInTheDocument();
  const confirmPasswordField = screen.getByTestId('confirmPassword');
  const errorText = screen.getByText('Password does not match');

  fireEvent.change(passwordField, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordField, { target: { value: 'password' } });

  expect(errorText).not.toBeVisible();

  fireEvent.change(confirmPasswordField, { target: { value: 'password1' } });

  expect(errorText).toBeVisible();
});
