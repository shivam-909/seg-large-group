import { render, screen } from '@testing-library/react';
import registration from './Registration';

test('renders Registration Page', () => {
  render(<registration />);
  const linkElement = screen.getByText("Sign Up Page");
  expect(linkElement).toBeInTheDocument();
});
