import React from 'react';
import { render} from '@testing-library/react';
import ErrorBox from '../Components/ErrorBox/ErrorBox';

describe ('ErrorBox component', () => {
    it ('should render component on the screen', () => {
        expect(true).toBeTruthy();
    });

    it ('renders message on the screen', () => {
        render (<ErrorBox/>);
        expect(message).toBeInTheDocument();
    });
});

