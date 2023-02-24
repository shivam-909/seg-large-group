import { render, screen } from '@testing-library/react';
import Registration from './Registration';

test('renders Registration Page', () => {
  render(<Registration/>);
  const linkElement = screen.getByText("Registration");
  expect(linkElement).toBeInTheDocument();
});
