// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import RegisterPage from '../Components/RegisterPage/RegisterPage';
// import {BrowserRouter, Route, Routes} from "react-router-dom";
//
//
// test('renders RegisterPage component without crashing', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// });
//
//   test('toggleRole function toggles visibility of Company-Fields and Seeker-Fields sections', () => {
//     const { getByText, getByPlaceholderText, queryByLabelText } = render(
//       <BrowserRouter>
//         <Routes>
//           <Route element={<RegisterPage />} />
//         </Routes>
//       </BrowserRouter>
//     );
//     // Confirm that the Company-Fields section is not visible
//     expect(queryByLabelText('Company name')).toBeNull();
//
//     // Confirm that the Seeker-Fields section is visible
//     expect(getByPlaceholderText('First name')).toBeInTheDocument();
//     expect(getByPlaceholderText('Last name')).toBeInTheDocument();
//
//     // Toggle role to Company
//     fireEvent.click(getByText('Company'));
//
//     // Confirm that the Company-Fields section is visible
//     expect(getByLabelText('Company name')).toBeInTheDocument();
//
//     // Confirm that the Seeker-Fields section is not visible
//     expect(queryByLabelText('First name')).toBeNull();
//     expect(queryByLabelText('Last name')).toBeNull();
//
//     // Toggle role back to Job Seeker
//     fireEvent.click(getByText('Job Seeker'));
//
//     // Confirm that the Seeker-Fields section is visible
//     expect(getByPlaceholderText('First name')).toBeInTheDocument();
//     expect(getByPlaceholderText('Last name')).toBeInTheDocument();
//
//     // Confirm that the Company-Fields section is not visible
//     expect(queryByLabelText('Company name')).toBeNull();
//   });
//
//
// test('togglePasswordVisibility function toggles password visibility', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   const passwordField = screen.queryByTestId('password');
//   const confirmPassField = screen.queryByTestId('confirmPass');
//   const eyeIcon = screen.getByAltText('toggle password');
//
//   expect(passwordField.type).toBe('password');
//   expect(confirmPassField.type).toBe('password');
//
//   fireEvent.click(eyeIcon);
//
//   expect(passwordField.type).toBe('text');
//   expect(confirmPassField.type).toBe('text');
//
//   fireEvent.click(eyeIcon);
//
//   expect(passwordField.type).toBe('password');
//   expect(confirmPassField.type).toBe('password');
// });
//
// test('checkPasswordMatch function validates passwords correctly', () => {
  // render(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route element={<RegisterPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
//   const passwordField = screen.getByPlaceholderText("Password");
//   expect(passwordField).toBeInTheDocument();
//   const confirmPasswordField = screen.getByTestId('confirm-password');
//   const errorText = screen.getByText('Passwords does not match');
//
//   fireEvent.change(passwordField, { target: { value: 'password' } });
//   fireEvent.change(confirmPasswordField, { target: { value: 'password' } });
//
//   expect(errorText).not.toBeVisible();
//
//   fireEvent.change(confirmPasswordField, { target: { value: 'password1' } });
//
//   expect(errorText).toBeVisible();
// });
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RegisterPage from '../Components/RegisterPage/RegisterPage';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

// mock the axios.post method
jest.mock('axios');

describe('RegisterPage component', () => {
  beforeEach(() => {
    render(
      <RegisterPage/>
    );
  });

  test('renders register form', () => {
    const registerForm = screen.getByText("Register an account",  {exact:false});
    waitFor(() => expect(registerForm).toBeInTheDocument());
  });

  test('toggles password visibility', () => {
    const toggleEye = screen.getByAltText("toggle eye");
    const passwordInput = document.getElementById("password");

    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));

    fireEvent.click(toggleEye);

    waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'));

  });

  test('validates email', async () => {
    const emailInput = document.getElementById("email");

    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeVisible();
    });
  });

  test('submits registration form', async () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const companyNameInput = document.getElementById("companyName");
    const signUpButton = screen.getByText("Sign Up");

    // mock the axios.post method response
    axios.post.mockResolvedValueOnce({
      data: {
        access: 'access_token',
        refresh: 'refresh_token',
      },
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test1234!' } });

    // set role to Job Seeker
    fireEvent.click(screen.getByText(/job seeker/i));

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}auth/register`, expect.any(FormData));
    });
  });
});
