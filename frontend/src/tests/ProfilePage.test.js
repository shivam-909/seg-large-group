const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import UserProfilePage from '../Components/ProfilePage/UserProfilePage';

describe('EmployerProfilePage', () => {
  test('render navbar', () => {
    render(<UserProfilePage />);
    const navbarElement = screen.queryByTestId('navbar');
    waitFor(() => expect(navbarElement).toBeInTheDocument())
  });
});
