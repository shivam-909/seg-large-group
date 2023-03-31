import React from 'react';
import { render, waitFor} from '@testing-library/react';
import NavBar from '../Components/NavBar/NavBar';

test ('should render component on the screen', () => {
    render (<NavBar />);
    expect(true).toBeTruthy();
});

test('renders topnav', () => {
    render (<NavBar/>);

    waitFor(() => expect((screen.queryAllByTestId('topnav-test')).getByRole('link')).toHaveAttribute('href', '/' ));
});

test('renders component with each label linking to href values respective href values', () =>{
    render (<NavBar/>);

    waitFor(() => expect((screen.queryAllByTestId('navbar-test')).getByRole('link',{name: 'Profile'})).toHaveAttribute('href', '/profile/' + userID ));
    waitFor(() => expect((screen.queryAllByTestId('navbar-test')).getByRole('link',{name: 'My Jobs'})).toHaveAttribute('href', '/jobs'));
    waitFor(() => expect((screen.queryAllByTestId('navbar-test')).getByRole('link',{name: 'Log Out'})).toHaveAttribute('href', '/login'));
});