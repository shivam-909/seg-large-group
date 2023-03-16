import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../Components/RegisterPage/RegisterPage';

test('renders RegisterPage component without crashing', () => {
  render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);
});

test('toggleRole function toggles visibility of Company-Fields and Seeker-Fields sections', () => {
  render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);
  const seekerFields = screen.getByTestId('Seeker-Fields');
  const companyFields = screen.getByTestId('Company-Fields');

  expect(seekerFields).toBeVisible();
  expect(companyFields).not.toBeVisible();

  fireEvent.click(screen.getByText('Company'));

  expect(seekerFields).not.toBeVisible();
  expect(companyFields).toBeVisible();
});

test('togglePasswordVisibility function toggles password visibility', () => {
  render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);
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
  render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);
  const passwordField = screen.getByTestId('password');
  const confirmPassField = screen.getByTestId('confirmPass');
  const errorText = screen.getByText('Password does not match');

  fireEvent.change(passwordField, { target: { value: 'password' } });
  fireEvent.change(confirmPassField, { target: { value: 'password' } });

  expect(errorText).not.toBeVisible();

  fireEvent.change(confirmPassField, { target: { value: 'password1' } });

  expect(errorText).toBeVisible();
});
