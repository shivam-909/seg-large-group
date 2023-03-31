import React from 'react';
import { render} from '@testing-library/react';
import ErrorBox from '../Components/ErrorBox/ErrorBox';

describe ('ErrorBox component', () => {
const errorMessage ={
    message: 'Error'
};

    it ('should render component on the screen', () => {
        render (<ErrorBox error={errorMessage}/>);
        expect(true).toBeTruthy();
    });
});

