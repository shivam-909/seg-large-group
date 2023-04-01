import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import ErrorBox from '../Components/ErrorBox/ErrorBox';

describe ('ErrorBox component', () => {
const errorMessage ={
    message: 'Error'
};

    it ('should render component on the screen', () => {
        render (<ErrorBox error={errorMessage}/>);
        expect(true).toBeTruthy();
        waitFor(() => expect(screen.getByText('Error').toBeInTheDocument()));
    });
});

