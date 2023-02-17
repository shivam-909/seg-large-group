import { render, screen } from '@testing-library/react';
import LgoinPage from './LoginPage';

test('renders learn react link', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/Login Page/i);
  expect(linkElement).toBeInTheDocument();
});
