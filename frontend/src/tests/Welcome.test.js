import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import Welcome from '../Components/LoginPage/Welcome';

describe ('Welcome component', () => {
    render (<Welcome />);

    test('should display heading', () => {
        const {getByText} = within(screen.getByTestId('welcome'));
        expect(getByText('Welcome')).toBeInTheDocument();
    });

    test ('should render /href links as button', () => {
        waitFor(() => expect((screen.queryAllByTestId('signup-link')).getByRole('link',{name: 'Sign Up'})).toHaveAttribute('href', '/signup'));
        waitFor(() => expect((screen.queryAllByTestId('login-link')).getByRole('link',{name: 'Login'})).toHaveAttribute('href', '/login'));
    });
});
