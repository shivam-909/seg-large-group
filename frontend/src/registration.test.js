import { render, screen } from '@testing-library/react';
import signupPage from './registration';

test('renders Sign Up Page', () => {
  render(<signupPage />);
  const linkElement = screen.getByText("Sign Up Page");
  expect(linkElement).toBeInTheDocument();
});
