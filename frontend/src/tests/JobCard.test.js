const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

import React from 'react';
import { render, waitFor} from '@testing-library/react';
import JobCard from '../Components/MyJobs/JobCard';

describe('JobCard', () => {
    test('renders component with props', () => {
        const props = {
            id: '',
            date: '',
            location: '',
            schedule: '',
            title: ''
        };
        render(<JobCard {...props}/>);
    });
});
