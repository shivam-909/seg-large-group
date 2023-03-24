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
// test('toggleRole function toggles visibility of Company-Fields and Seeker-Fields sections', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   const seekerFields = screen.getByRole('searcher', {hidden: true});
//   const companyFields = screen.getByRole('company', {hidden: true});
//
//   expect(seekerFields).toHaveClass('hidden');
//   expect(companyFields).not.toHaveClass('hidden');
//   fireEvent.click(companyFields);
//   expect(seekerFields).not.toHaveClass('hidden');
//   expect(companyFields).toHaveClass('hidden');
// });
//
// test('togglePasswordVisibility function toggles password visibility', () => {
  // render(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route element={<RegisterPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
//   const passwordField = screen.getByTestId('password');
//   const confirmPassField = screen.getByTestId('confirmPass');
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
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   const passwordField = screen.getByTestId("password");
//   expect(passwordField).toBeInTheDocument();
//   const confirmPasswordField = screen.getByTestId('confirmPassword');
//   const errorText = screen.getByText('Password does not match');
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
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../Components/RegisterPage/RegisterPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe('RegisterPage', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );    expect(screen.getByText('Register an account')).toBeInTheDocument();
  });

  it('allows user to register with valid credentials', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
    // Fill in form fields
    const roleButton = screen.getByRole('button', { name: 'Job Seeker' });
    fireEvent.click(roleButton);

    const firstNameInput = screen.getByLabelText('First name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const lastNameInput = screen.getByLabelText('Last name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    const emailInput = screen.getByLabelText('Email address');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'P@ssw0rd' } });

    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    fireEvent.change(confirmPasswordInput, { target: { value: 'P@ssw0rd' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Sign up' });
    fireEvent.click(submitButton);

    // Wait for API call to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify that user is redirected to home page
    expect(window.location.pathname).toBe('/');
  });

  it('displays error message when API call fails', async () => {
    // Mock axios.post to simulate API call failure
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject());

    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
    // Fill in form fields
    // ...

    // Submit form
    // ...

    // Wait for API call to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Verify that error message is displayed
    expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
  });
});
