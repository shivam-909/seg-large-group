const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

import React from 'react';
import { render, waitFor, getByRole} from '@testing-library/react';
import CompanyJobCard from '../Components/MyJobs/CompanyJobCard';

describe('CompanyJobCard', () => {
    test('renders component with props', () => {
        const props = {
            id:'',
            date: '',
            location:'',
            schedule:'',
            title: ''
        };
        render(<CompanyJobCard {...props}/> );
    });

    test('renders correctly with props', () => {
        const props = {
            id:'',
            date: '',
            location:'',
            schedule:'',
            title: ''
        };
    //     const editButton = getByRole('button', {class: 'fa-solid fa-pen-to-square text-xl'});
    // //     const
    //
     })
});

