import React from 'react';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event'


test('renders forgot password page', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  });
  
  test('render email input', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  
    const emailInput = screen.queryByTestId('email-input');
    const button = screen.queryByTitle('submit-button');

    waitFor(() => expect(emailInput).toBeInTheDocument());
    waitFor(() => expect(emailInput).toHaveAttribute('type', 'email'));

    waitFor(() => expect(button).toBeInTheDocument());
    waitFor(() => expect(button).toHaveAttribute('type', 'button'));
  });

  test('invalid email input', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234testgmail.com');
    waitFor(() => expect(screen.queryByTestId('email-input')).toHaveValue('1234testgmail.com'));
    waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email'));
  });

  // test('when submit button clicked, alert should come up', () =>{
  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route element={<ForgotPassword />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );

  //   // const submitButton = screen.queryByAltText('submit-button')
  //   fireEvent.click(screen.queryByAltText('submit-button'));

  //   expect(alert).toBeVisible;

  // });

