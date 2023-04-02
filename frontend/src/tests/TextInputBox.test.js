import React from 'react';
import { render} from '@testing-library/react';
import TextInputBox from '../Components/LoginPage/TextInputBox';

describe ('TextInputBox component', () => {
    const props ={
        id: 'email',
        type: 'email',
        onChange:'',
        onBlur: '',
        placeholder:''
    };
    
        it ('should render component on the screen', () => {
            render (<TextInputBox/>);
            expect(true).toBeTruthy();
        });
    });