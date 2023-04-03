import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from '../Auth/PrivateRoute';
import RefreshToken from '../Auth/RefreshToken';

// jest.mock('axios');
// jest.mock('../AuthRefreshToken', () => jest.fn());

describe('PrivateRoute', () => {
  // beforeEach(() => {
  //   jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('test-token');
  //   jest.spyOn(window.localStorage.__proto__, 'setItem');
  //   jest.spyOn(window.localStorage.__proto__, 'removeItem');
  // });
  //
  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  test('renders the outlet when the user is authenticated', async () => {
  //   const mockPost = jest.fn().mockResolvedValueOnce({ data: {} });
  //   axios.post = mockPost;
  //
  //   render(<PrivateRoute />, { wrapper: MemoryRouter });
  //
  //   await waitFor(() => expect(RefreshToken).toHaveBeenCalledTimes(1));
  //   await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
  //
  //   expect(screen.getByTestId('outlet')).toBeInTheDocument();
  // });
  //
  // test('redirects to the login page when the user is not authenticated', async () => {
  //   const mockPost = jest.fn().mockRejectedValueOnce({});
  //   axios.post = mockPost;
  //
  //   render(<PrivateRoute />, { wrapper: MemoryRouter });
  //
  //   await waitFor(() => expect(RefreshToken).toHaveBeenCalledTimes(1));
  //   await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
  //
  //   expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
