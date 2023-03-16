const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const RegisterPage = require('../Components/RegisterPage/RegisterPage');
const userEvent = require("@testing-library/user-event");
const { BrowserRouter, Routes, Route } = require('react-router-dom');

describe("RegisterPage", () => {
  test("renders RegisterPage component", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);
    const header = await screen.findByText(/register an account/i);
    expect(header).toBeInTheDocument();
  });
  test("shows password when clicked on show icon", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const toggleEye = await screen.findByAltText("toggle password visibilty");
    userEvent.click(toggleEye);
    const passwordInput = await screen.findByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("hides password when clicked on show icon", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const toggleEye = await screen.findByAltText("toggle password visibilty");
    userEvent.click(toggleEye);
    userEvent.click(toggleEye);
    const passwordInput = await screen.findByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("password validation error message is visible when entering a invalid password", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const passwordInput = await screen.findByLabelText(/password/i);
    fireEvent.blur(passwordInput, { target: { value: "password"} });
    const passwordError = await screen.findByText(/invalid password/i);
    expect(passwordError).toBeInTheDocument();
  });

  test("password validation error message is not visible when entering a valid password", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const passwordInput = await screen.findByLabelText(/password/i);
    fireEvent.blur(passwordInput, { target: { value: "Password123!"} });
    await waitFor(() => {
      const passwordError = screen.queryByText(/invalid password/i);
      expect(passwordError).not.toBeInTheDocument();
    });
  });

  test("email validation error message is visible when entering a invalid email", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const emailInput = await screen.findByLabelText(/email address/i);
    fireEvent.blur(emailInput, { target: { value: "notanemail"} });
    const emailError = await screen.findByText(/invalid email/i);
    expect(emailError).toBeInTheDocument();
  });

  test("email validation error message is not visible when entering a valid email", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const emailInput = await screen.findByLabelText(/email address/i);
    fireEvent.blur(emailInput, { target: { value: "test@example.com"} });
    await waitFor(() => {
      const emailError = screen.queryByText(/invalid email/i);
      expect(emailError).not.toBeInTheDocument();
    });
  });

  test("password mismatch error message is visible when entering two different passwords", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const passwordInput = await screen.findByLabelText(/password/i);
    const confirmPasswordInput = await screen.findByLabelText(/confirm password/i);
    fireEvent.blur(passwordInput, { target: { value: "Password123!"} });
    fireEvent.blur(confirmPasswordInput, { target: { value: "DifferentPassword123!"} });
    const passwordMismatchError = await screen.findByText(/passwords do not match/i);
    expect(passwordMismatchError).toBeInTheDocument();
  });

  test("password mismatch error message is not visible when entering two same passwords", async () => {
    render(<BrowserRouter><Routes><Route element={ <RegisterPage/> }/></Routes></BrowserRouter>);

    const passwordInput = await screen.findByLabelText(/password/i);
    const confirmPasswordInput = await screen.findByLabelText(/confirm password/i);
    fireEvent.blur(passwordInput, { target: { value: "TestPassword123!"} });
    fireEvent.blur(confirmPasswordInput, { target: { value: "TestPassword123!"} });
    const errorMessage = screen.queryByText(/passwords do not match/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
