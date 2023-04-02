import LoginPage from "../Components/LoginPage/LoginPage";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

import React from 'react';
import { render, waitFor} from '@testing-library/react';
import CompanyJobCard from '../Components/MyJobs/CompanyJobCard';

describe('CompanyJobCard component', () => {
    beforeEach(() => {
        render(
            <CompanyJobCard/>
        );
    });
    test('renders component with props', () =>{
            const { getByPlaceholderText, getByText } = render(
                <CompanyJobCard id={0} /> );

    });
});

