import { render, fireEvent, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../Components/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";

describe ('Login component', () => {
  it ('renders login page with email, password fields', async () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
  });

  it('render email input', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.queryByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('allows valid email input to pass', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.queryByTestId('email-input');
    userEvent.type(emailInput, '1234test@gmail.com');
    expect(screen.queryByTestId('email-input')).toHaveValue('1234test@gmail.com');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  //Invalid email input test cases
  it('shows "Invalid email" when passing email input without an @', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, '1234testgmail.com');
    expect(screen.getByTestId('email-input')).toHaveValue('1234testgmail.com');
    expect(screen.queryByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email');
  });

  it('shows "Invalid email" when passing email input starting with an @', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    expect(screen.getByTestId('email-input')).toHaveValue('@12344.com');
    expect(screen.queryByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email');
  });

  it('shows "Invalid email" when passing email address without a domain', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, '1234@');
    expect(screen.getByTestId('email-input')).toHaveValue('1234@');
    expect(screen.queryByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email');
  });

  it('shows "Invalid email" when attempting to pass an invalid email input starting with an @', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, '@12344.com');
    expect(screen.getByTestId('email-input')).toHaveValue('@12344.com');
    expect(screen.queryByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('error').textContent).toEqual('Invalid Email');
  });

  //Testing the Remember Login checkbox
  it('renders rememberLogin checkbox component', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
    
    const rememberLogin = screen.getElementById('rememberLogin');
    expect(rememberLogin).toBeInTheDocument();
    expect(rememberLogin).not.toBeChecked();
  })

  it('toggles elememt when clicking the checkbox', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
    
    const rememberLogin = screen.getByRole('checkbox');
    userEvent.click(rememberLogin);
    expect(rememberLogin).toBeChecked();
  })

  it('displays error message when inputs are invalid', () => {
    render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
    const loginButton = screen.getByRole('button', {name: 'Login'});
    fireEvent.click(loginButton);
    expect(screen.getByText(/Invalid Login Details/)).toBeInTheDocument();
  });










})

// test("renders Login Page with email field, password field", async () => {
//   render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
//   // const signInTitle = screen.getAllByText("Sign in to your account");
//   // const email = screen.getAllByLabelText("Email address");
//   // const password = screen.getAllByLabelText(/password/i);
//   // const rememberLogin = screen.getByText(/rememberLogin/i);
//   // const loginButton = screen.getByText (/loginButton/i);
//   // const signup = screen.getAllByText(/signup/i);
//   // const forgotPassword = screen.getByText(/forgotPassword/i);

//   expect(screen.getByLabelText(/Sign in to your account/));
//   expect(screen.queryAllByPlaceholderText(/Email address/));
//   expect(screen.queryAllByPlaceholderText(/Password/));
//   // expect(rememberLogin).toBeInTheDocument();
//   // expect(loginButton).toBeInTheDocument();
  
//   // expect(signup).toBeInTheDocument();
//   // expect(signup).toHaveTextContent("New User?");

//   // expect(forgotPassword).toBeInTheDocument();
// });

// test("shows password when clicked on show icon", async () => {
//   render(<BrowserRouter><Routes><Route element={ <LoginPage/> }/></Routes></BrowserRouter>);
//   const toggleEye = await screen.findByAltText("");
//   userEvent.click(toggleEye);
//   const passwordInput = await screen.findByLabelText(/password/i);
//   expect(passwordInput).toHaveAttribute("type", "text");
// });

// test("allows users to submit their details", () => {
//   render (<LoginPage/>)

//   const email = screen.getAllByLabelText(/email/i);
//   const password = screen.getAllByLabelText(/password/i);
//   const rememberLogin = screen.getByText(/rememberLogin/i);
//   const loginButton = screen.getByText (/loginButton/i);

//   userEvent.type(email, "amy@gmail.com");
//   userEvent.type(password, "hello123");
//   userEvent.type(rememberLogin, checked);
//   userEvent.type(loginButton);

//   fireEvent.click(loginButton);

//   expect(loginButton).toHaveBeenCalledWith({
//     email: "amy@gmail.com",
//     password: "hello123"
//   });
// })

// test("for new users when clicked should navigate to sign up page", () =>{
//   expect(screen.getByText("Sign Up.").closest("a")).toHaveAttribute("href", "/signup")
// });

// //Testing forgot password link 


// test("forgotten password page is rendered with button as a link is clicked", () =>{
//   expect(screen.getByRole("link", { name: /forgotPassword/i}).closest("a")).toHaveAttribute("href", "/forgotPassword")
//   expect
// });

// test('make a login request and handle response', () => {
//   // TODO: make a login request and handle response
// });

