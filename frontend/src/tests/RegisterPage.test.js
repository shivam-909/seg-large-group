// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import RegisterPage from '../Components/RegisterPage/RegisterPage';
// import {BrowserRouter, Route, Routes} from "react-router-dom";
//
//
// test('renders RegisterPage component without crashing', () => {
  // render(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route element={<RegisterPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
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
//   const seekerFields = screen.getByRole('button', {name:'searcher', hidden: true});
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
//   render(
//     <BrowserRouter>
//       <Routes>
//         <Route element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
//   const passwordField = screen.getByPlaceholder("Password");
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

import { render, screen } from "@testing-library/react";
import RegisterPage from '../Components/RegisterPage/RegisterPage';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";


jest.mock('axios');

describe("RegisterPage", () => {
  it("renders job seeker role on start", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && content.toLowerCase().includes('job seeker')
    })).toBeInTheDocument();
  });
  it("switches to company role when clicked", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );    userEvent.click(screen.getByText(/company/i));
    expect(screen.getByText(/company name/i)).toBeInTheDocument();
});

  it("sends post request to register when sign up button clicked", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );    userEvent.type(screen.getByPlaceholderText(/email address/i), "test@test.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "Test1234!");
    userEvent.type(screen.getByPlaceholderText(/confirm password/i), "Test1234!");
    userEvent.click(screen.getByText(/sign up/i));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/auth/register', expect.any(FormData));
  });

  it("shows error message when sign up fails", async () => {
    const errorMessage = "User already exists";
    axios.post.mockRejectedValueOnce({response:{data:{detail:errorMessage}}});
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );    userEvent.type(screen.getByPlaceholderText(/email address/i), "test@test.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "Test1234!");
    userEvent.type(screen.getByPlaceholderText(/confirm password/i), "Test1234!");
    userEvent.click(screen.getByText(/sign up/i));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it("shows loading icon when sign up button clicked", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    );    userEvent.type(screen.getByPlaceholderText(/email address/i), "test@test.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "Test1234!");
    userEvent.type(screen.getByPlaceholderText(/confirm password/i), "Test1234!");
    userEvent.click(screen.getByText(/sign up/i));

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
