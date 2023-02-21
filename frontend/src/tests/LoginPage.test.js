import { render, screen } from '@testing-library/react';
import LoginPage from '../Components/LoginPage/LoginPage';

test('renders Login Page', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText("Login Page");
  expect(linkElement).toBeInTheDocument();
});