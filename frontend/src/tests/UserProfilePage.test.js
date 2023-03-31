import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserProfilePage from '../Components/ProfilePage/UserProfilePage';

test('render UserProfilePage', () => {
  render(<UserProfilePage />);
});

test('render UserProfilePage with navbar and skills', () => {
  render(<UserProfilePage />);
  const navbar = screen.queryByTestId('navbar');
  const skills = screen.queryByTestId('skills');
});
