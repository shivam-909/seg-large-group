import { render, fireEvent, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../Components/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";

test("renders Login Page with email field, password field", async () => {
  render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
  // const signInTitle = screen.getAllByText("Sign in to your account");
  // const email = screen.getAllByLabelText("Email address");
  // const password = screen.getAllByLabelText(/password/i);
  // const rememberLogin = screen.getByText(/rememberLogin/i);
  // const loginButton = screen.getByText (/loginButton/i);
  // const signup = screen.getAllByText(/signup/i);
  // const forgotPassword = screen.getByText(/forgotPassword/i);

  expect(screen.getByLabelText(/Sign in to your account/));
  expect(screen.queryAllByPlaceholderText(/Email address/));
  expect(screen.queryAllByPlaceholderText(/Password/));
  // expect(rememberLogin).toBeInTheDocument();
  // expect(loginButton).toBeInTheDocument();
  
  // expect(signup).toBeInTheDocument();
  // expect(signup).toHaveTextContent("New User?");

  // expect(forgotPassword).toBeInTheDocument();
});

test("shows password when clicked on show icon", async () => {
  render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
  const toggleEye = await screen.findByAltText("");
  userEvent.click(toggleEye);
  const passwordInput = await screen.findByLabelText(/password/i);
  expect(passwordInput).toHaveAttribute("type", "text");
});

test("allows users to submit their details", () => {
  render (<LoginPage/>)

  const email = screen.getAllByLabelText(/email/i);
  const password = screen.getAllByLabelText(/password/i);
  const rememberLogin = screen.getByText(/rememberLogin/i);
  const loginButton = screen.getByText (/loginButton/i);

  userEvent.type(email, "amy@gmail.com");
  userEvent.type(password, "hello123");
  userEvent.type(rememberLogin, checked);
  userEvent.type(loginButton);

  fireEvent.click(loginButton);

  expect(loginButton).toHaveBeenCalledWith({
    email: "amy@gmail.com",
    password: "hello123"
  });
})

test("for new users when clicked should navigate to sign up page", () =>{
  expect(screen.getByText("Sign Up.").closest("a")).toHaveAttribute("href", "/signup")
});

//Testing forgot password link 


test("forgotten password page is rendered with button as a link is clicked", () =>{

  expect(screen.getByRole("link", { name: /forgotPassword/i}).closest("a")).toHaveAttribute("href", "/forgotPassword")
  expect
});

test('make a login request and handle response', () => {
  // TODO: make a login request and handle response
});

