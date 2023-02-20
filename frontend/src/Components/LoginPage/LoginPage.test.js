import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders Login Page', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText("Login Page");
  expect(linkElement).toBeInTheDocument();
});
