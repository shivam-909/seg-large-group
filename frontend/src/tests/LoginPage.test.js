import { render, screen } from '@testing-library/react';
import LoginPage from '../Components/LoginPage/LoginPage';

test('renders Login Page', () => {
  render(<LoginPage />);
  const forgotPasswordLink = screen.getByText("Forgot your password?");
  expect(forgotPasswordLink).toBeInTheDocument();
  const signUpLink = screen.getByText("Sign up.");
  expect(signUpLink).toBeInTheDocument();
});
