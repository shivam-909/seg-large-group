import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Components/Navbar/Navbar';
import {BrowserRouter, Route, Routes, userEvent} from "react-router-dom";
import axios from 'axios';


describe('Navbar', () => {
  it('renders Navbar without crashing', () => {
  render(<Navbar />);
});

  it('should render the navbar with login and sign up buttons when not logged in', () => {
    render(<Navbar />);

    // Check that the "Log in" button is rendered
    const loginButton = screen.getByText('Log in');
    expect(loginButton).toBeInTheDocument();

    // Check that the "Sign up" button is rendered
    const signupButton = screen.getByText('Sign up');
    expect(signupButton).toBeInTheDocument();

    // Check that the "Profile" section is not rendered
    // const profileSection = screen.queryByRole('region', { name: 'expandProfile' });
    const profileSection = screen.queryByTestId('expandProfile');
    expect(profileSection).not.toBeInTheDocument();
  });

  it('should render the navbar with profile and notification icons when logged in', () => {
    // Set the isLoggedIn state to true
    const isLoggedIn = true;

    // Mock the localStorage.getItem function to return a valid token
    const localStorageMock = {
      getItem: jest.fn(() => 'valid_token')
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    // Mock the axios.post function to return a valid response
    const axiosPostMock = jest.fn(() => Promise.resolve({ data: 123 }));
    jest.mock('axios', () => ({
      post: jest.fn(() => Promise.resolve({ data: 123 }))
    }));

    render(<Navbar />);

    // Check that the "Profile" link is rendered
    const profileLink = screen.getByRole('link', { name: 'Profile' });
    expect(profileLink).toBeInTheDocument();

    // Check that the "MyJobs" link is rendered
    const myJobsLink = screen.getByRole('link', { name: 'My Jobs' });
    expect(myJobsLink).toBeInTheDocument();

    // Check that the "Log Out" link is rendered
    const logoutLink = screen.getByRole('link', { name: 'Log Out' });
    expect(logoutLink).toBeInTheDocument();
  });

  it('should not render the navbar with login and sign up buttons when logged in', () => {
    const isLoggedIn = true;
    // Mock the localStorage.getItem function to return a valid token
    const localStorageMock = {
      getItem: jest.fn(() => 'valid_token')
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
    render(<Navbar />);

    // Check that the "Log in" button is not rendered
    const loginButton = screen.queryByText('Log in');

    // Check that the "Sign up" button is not rendered
    const signupButton = screen.queryByText('Sign up');

    // Check that the "Profile" link is rendered
    const profileLink = screen.getByRole('link', { name: 'Profile' });
    expect(profileLink).toBeInTheDocument();
  });

  it('should not render the navbar with profile and notification icons when not logged in', () => {
    // Set the isLoggedIn state to false
    const isLoggedIn = false;

    // Mock the localStorage.getItem function to return null
    const localStorageMock = {
      getItem: jest.fn(() => null)
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    // Mock the axios.post function to return an imvalid response
    const axiosPostMock = jest.fn(() => Promise.resolve({ data: 123 }));
    jest.mock('axios', () => ({
      post: jest.fn(() => Promise.reject(new Error('Invalid token' )))
    }));

    render(<Navbar />);

    // Check that the "Profile" link is not rendered
    const profileLink = screen.queryByRole('link', { name: 'Profile' });

    // Check that the "MyJobs" link is not rendered
    const myJobsLink = screen.queryByRole('link', { name: 'My Jobs' });

    // Check that the "Log Out" link is not rendered
    const logoutLink = screen.queryByRole('link', { name: 'Log Out' });
  });
  // 
  // it('should log out the user when Log Out link is clicked', async () => {
  //   // Set the isLoggedIn state to true
  //   const isLoggedIn = true;
  //
  //   // Mock the localStorage.getItem function to return a valid token
  //   const localStorageMock = {
  //     getItem: jest.fn(() => 'valid_token'),
  //     removeItem: jest.fn()
  //   };
  //   Object.defineProperty(window, 'localStorage', {
  //     value: localStorageMock,
  //     writable: true
  //   });
  //
  //   // Mock the axios.post function to return a valid response
  //   //const axiosPostMock = jest.fn(() => Promise.resolve({ data: 123 }));
  //   jest.mock('axios', () => ({
  //     post: jest.fn(() => Promise.resolve({ data: 123 }))
  //   }));
  //
  //   render(<Navbar />);
  //
  //   // Check that the "Log Out" link is rendered
  //   // const logoutLink = screen.getByRole('link', { name: 'Log Out' });
  //   // userEvent.click(logoutLink);
  //   // expect(localStorage.getItem("access")).toBeNull();
  //   const logoutLink = screen.getByText("Log Out");
  //   fireEvent.click(logoutLink);
  //
  //   expect(localStorageMock.removeItem).toHaveBeenCalledWith("access");
  //   expect(localStorageMock.getItem("access")).toBeNull();
  // });


});
