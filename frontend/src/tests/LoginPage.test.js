import React from 'react';
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import LoginPage from "../Components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event'

test('renders login page', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
});

test('render email input', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );

  const emailInput = screen.queryByTestId('email-input');
  waitFor(() => expect(emailInput).toBeInTheDocument());
  waitFor(() => expect(emailInput).toHaveAttribute('type', 'email'));
});

test('render password input', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );

  const passwordInput = screen.queryByTestId('password-input');
  waitFor(() => expect(passwordInput).toBeInTheDocument());
  waitFor(() => expect(passwordInput).toHaveAttribute('type', 'password'));
});

test('allows valid email input to pass', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234test@gmail.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234test@gmail.com'));
    waitFor(() => expect(screen.queryByTestId('error')).not.toBeInTheDocument());
  });

  //Invalid email input test cases
  test ('shows "Invalid email" when passing email input without an @', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234testgmail.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234testgmail.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when passing email input starting with an @', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('@12344.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when passing email address without a domain', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234@');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234@'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  test('shows "Invalid email" when attempting to pass an invalid email input starting with an @', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('@12344.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  //Testing the Remember Login checkbox
  test('renders rememberLogin checkbox component', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );

    const rememberLogin = screen.queryByTestId('rememberLogin');
    waitFor(() => expect(rememberLogin).toBeInTheDocument());
    waitFor(() => expect(rememberLogin).not.toBeChecked());
  });

  // https://stackoverflow.com/questions/73184212/how-to-test-checkbox-checked-with-react-testing-library
//   test('toggles element when clicking the checkbox', () => {
//       render(
//       <BrowserRouter>
//         <Routes>
//           <Route element={<LoginPage />} />
//         </Routes>
//       </BrowserRouter>
//     );
//       userEvent.click((screen.queryByTestId('rememberLogin')).getByText('Keep me signed in'));
//       expect(screen.getByLabelText('Keep me signed in')).toBeChecked();
//
//       // screen.getByRole('');
//
//     // screen.getByText('Keep me signed in');
//
//     // waitFor(() => expect(screen.queryByTestId('rememberLogin')).toBeInTheDocument());
//     // waitFor(() => expect(rememberLogin).toBeChecked());
//
// // waitFor(() => expect(screen.queryByTestId('rememberLogin')).toBeInTheDocument());
// //   waitFor(() => expect(rememberLogin).not.toBeChecked());
//
//   });


// test('togglePasswordVisibility function toggles password visibility', () => {
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<LoginPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   const passwordInput = screen.queryByTestId('password-input');
//   const eyeIcon = screen.getByAltText('toggleEye');

//   expect(passwordInput.type).toBe('password');

//   fireEvent.click(eyeIcon);

//   expect(passwordField.type).toBe('text');

//   fireEvent.click(eyeIcon);

//   expect(passwordField.type).toBe('password');
// });

//Testing sign up page and forgot password link  
test("links with href value /signup and /forgotPassword", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
  waitFor(() => expect((screen.queryAllByTestId('signup-link')).getByRole('link',{name: 'Sign Up'})).toHaveAttribute('href', '/signup'));
  waitFor(() => expect((screen.queryAllByTestId('forgottenpw-link')).getByRole('link',{name: 'Reset password.'})).toHaveAttribute('href', '/forgotPassword'));
});

// test('make a login request and handle response', () => {
//   // TODO: make a login request and handle response
// });

