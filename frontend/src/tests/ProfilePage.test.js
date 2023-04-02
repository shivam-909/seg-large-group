const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import UserProfilePage from '../Components/ProfilePage/UserProfilePage';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";


describe('UserProfilePage', () => {
  // test('render user profile page', () => {
  //   render(<BrowserRouter><Routes><Route element={ <UserProfilePage/> }/></Routes></BrowserRouter>);
  //   const navbarElement = screen.queryByTestId('navbar');
  //   waitFor(() => expect(navbarElement).toBeInTheDocument())
  // });
  //
  // test('render contact information inputs', () => {
  //   render(<UserProfilePage />);
  //   const firstNameInput = screen.getByPlaceholderText('Please enter your First Name');
  //   const lastNameInput = screen.getByPlaceholderText('Please enter your Last Name');
  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const locationInput = screen.getByPlaceholderText('Search City...');
  //   expect(firstNameInput).toBeInTheDocument();
  //   expect(lastNameInput).toBeInTheDocument();
  //   expect(emailInput).toBeInTheDocument();
  //   expect(locationInput).toBeInTheDocument();
  // });
  //
  // test('disables contact information when not editing', () => {
  //   render(<UserProfilePage />);
  //   const companyNameInput = screen.getByPlaceholderText('Please enter your Company Name');
  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const locationInput = screen.getByPlaceholderText('Please enter your Location');
  //   expect(companyNameInput).toBeDisabled();
  //   expect(emailInput).toBeDisabled();
  //   expect(locationInput).toBeDisabled();
  // });
  //
  // test('enables contact information when not editing', () => {
  //   render(<UserProfilePage />);
  //   const editButton = screen.getByText('Edit');
  //   fireEvent.click(editButton);
  //   const companyNameInput = screen.getByPlaceholderText('Please enter your Company Name');
  //   const locationInput = screen.getByPlaceholderText('Please enter your Location');
  //   expect(companyNameInput).toBeEnabled();
  //   expect(locationInput).toBeEnabled();
  });
});
