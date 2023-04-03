import React from 'react';
import { render} from '@testing-library/react';
import TextInputBox from '../Components/LoginPage/TextInputBox';

describe ('TextInputBox component', () => {
        it ('should render component on the screen', () => {
            render (<TextInputBox/>);
            expect(true).toBeTruthy();
        });
 });
