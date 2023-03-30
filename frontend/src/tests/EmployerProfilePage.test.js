import { render, screen, fireEvent } from '@testing-library/react';
import EmployerProfilePage from '../Components/ProfilePage/EmployerProfilePage';

describe('EmployerProfilePage', () => {
  test('render navbar', () => {
    render(<EmployerProfilePage />);
    const navbarElement = screen.queryByTestId('navbar');
  });

  test('render contact information inputs', () => {
    render(<EmployerProfilePage />);
    const companyNameInput = screen.getByPlaceholderText('Please enter your Company Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const locationInput = screen.getByPlaceholderText('Please enter your Location');
    expect(companyNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
  });

  test('disables contact information when not editing', () => {
    render(<EmployerProfilePage />);
    const companyNameInput = screen.getByPlaceholderText('Please enter your Company Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const locationInput = screen.getByPlaceholderText('Please enter your Location');
    expect(companyNameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(locationInput).toBeDisabled();
  });

  test('enables contact information when not editing', () => {
    render(<EmployerProfilePage />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const companyNameInput = screen.getByPlaceholderText('Please enter your Company Name');
    const locationInput = screen.getByPlaceholderText('Please enter your Location');
    expect(companyNameInput).toBeEnabled();
    expect(locationInput).toBeEnabled();
  });




});
