const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import MyJobs from "../Components/MyJobs/MyJobs";

describe('MyJobs', () => {
    beforeEach(() => {
        const user = { userID: 1234 };
        render(
            <MyJobs>
        );
    });

    it('should render every category option', () => {
        let saved = document.getElementById("Saved")
        let applied = document.getElementById("Applied")
        let interview = document.getElementById("Interview")
        let archived = document.getElementById("Archived")
        waitFor(() => {expect(saved).toBeInTheDocument()})
        waitFor(() => {expect(applied).toBeInTheDocument()})
        waitFor(() => {expect(interview).toBeInTheDocument()})
        waitFor(() => {expect(archived).toBeInTheDocument()})
    });

    it('should change categories when pressed', () => {
        const { getByText } = render(<MyJobs/>)
        let saved = document.getElementById("Saved")
        const applied = document.getElementById("Applied");
        let interview = document.getElementById("Interview")
        let archived = document.getElementById("Archived")
        fireEvent.click(getByText("Saved"));
        waitFor(() => {expect(applied.disabled).toBeTruthy()})
    });

    // it('should render the navbar with profile and notification icons when logged in', () => {
    //     // Set the isLoggedIn state to true
    //     const isLoggedIn = true;
    //
    //     // Mock the localStorage.getItem function to return a valid token
    //     const localStorageMock = {
    //         getItem: jest.fn(() => 'valid_token')
    //     };
    //     Object.defineProperty(window, 'localStorage', {
    //         value: localStorageMock,
    //         writable: true
    //     });
    //
    //     // Mock the axios.post function to return a valid response
    //     const axiosPostMock = jest.fn(() => Promise.resolve({ data: 123 }));
    //     jest.mock('axios', () => ({
    //         post: jest.fn(() => Promise.resolve({ data: 123 }))
    //     }));
    //
    //     // Check that the "Profile" link is rendered
    //     const profileLink = screen.getByRole('link', { name: 'Profile' });
    //     expect(profileLink).toBeInTheDocument();
    //
    //     // Check that the "MyJobs" link is rendered
    //     const myJobsLink = screen.getByRole('link', { name: 'My Jobs' });
    //     expect(myJobsLink).toBeInTheDocument();
    //
    //     // Check that the "Log Out" link is rendered
    //     const logoutLink = screen.getByRole('link', { name: 'Log Out' });
    //     expect(logoutLink).toBeInTheDocument();
    // });
    //
    // it('should not render the navbar with login and sign up buttons when logged in', () => {
    //     const isLoggedIn = true;
    //
    //     // Check that the "Log in" button is not rendered
    //     const loginButton = screen.queryByText('Log in');
    //     // Check that the "Sign up" button is not rendered
    //     const signupButton = screen.queryByText('Sign up');
    //
    //     // Check that the "Profile" link is rendered
    //     const profileLink = screen.getByRole('link', { name: 'Profile' });
    //     expect(profileLink).toBeInTheDocument();
    // });
    //
    // it('should not render the navbar with profile and notification icons when not logged in', () => {
    //     // Set the isLoggedIn state to false
    //     const isLoggedIn = false;
    //
    //     // Mock the localStorage.getItem function to return null
    //     const localStorageMock = {
    //         getItem: jest.fn(() => null)
    //     };
    //     Object.defineProperty(window, 'localStorage', {
    //         value: localStorageMock,
    //         writable: true
    //     });
    //
    //     // Mock the axios.post function to return an imvalid response
    //     const axiosPostMock = jest.fn(() => Promise.resolve({ data: 123 }));
    //     jest.mock('axios', () => ({
    //         post: jest.fn(() => Promise.reject(new Error('Invalid token' )))
    //     }));
    //
    //     // Check that the "Profile" link is not rendered
    //     const profileLink = screen.queryByRole('link', { name: 'Profile' });
    //
    //     // Check that the "MyJobs" link is not rendered
    //     const myJobsLink = screen.queryByRole('link', { name: 'My Jobs' });
    //
    //     // Check that the "Log Out" link is not rendered
    //     const logoutLink = screen.queryByRole('link', { name: 'Log Out' });
    // });
});
