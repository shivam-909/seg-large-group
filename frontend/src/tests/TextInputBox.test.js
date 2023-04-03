import React from 'react';
import { render} from '@testing-library/react';
import TextInputBox from '../Components/LoginPage/TextInputBox';

describe ('TextInputBox component', () => {
<<<<<<< Updated upstream
        it ('should render component on the screen', () => {
            render (<TextInputBox/>);
            expect(true).toBeTruthy();
        });
    });
=======
    const props ={
        id: 'email',
        type: 'email',
        onChange: '',
        onBlur: '',
        placeholder:'Email Address'
    };

    it ('should render component', () => {
        render (<TextInputBox/>);
        expect(true).toBeTruthy();
    });
    
 });
>>>>>>> Stashed changes
