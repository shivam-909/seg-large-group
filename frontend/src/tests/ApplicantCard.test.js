import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import ApplicantCard from '../Components/Applicants/ApplicantCard';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('ApplicantsCard', () => {
    const props = {
            id: '1',
            name: 'Test1',
            pfpUrl:'',
            email: 'test@gmail.com',
            status: 'Hired'
        };

    test('renders the name', () => {
        render(<ApplicantCard {...props}/>);
        const name = screen.getByText(props.name);
        expect(name).toBeInTheDocument();
    });

    test('renders the email', () => {
        render(<ApplicantCard {...props}/>);
        const email = screen.getByText(props.email);
        expect(email).toBeInTheDocument();
    });

    test('renders the status', () => {
        render(<ApplicantCard {...props}/>);
        const status = screen.getByText(props.status);
        expect(status).toBeInTheDocument();
    });
});
