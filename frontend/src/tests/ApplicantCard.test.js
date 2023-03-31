import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ApplicantCard from '../Components/Applicants/ApplicantCard';
import {useNavigate} from "react-router-dom";


describe('ApplicantsCard', () => {
    test('renders ApplicantsCard correctly', () => {
        const props = {
            id: '1',
            name: 'Test1',
            pfpUrl:'' ,
            email: 'test@gmail.com',
            status: 'Hired'
        };
        render(<ApplicantCard {...props}/>);
    });

    test ('render with props', () => {
        const props = {
            id: '1',
            name: 'Test1',
            email: 'test@gmail.com',
            status: 'Hired'
        };
        const { getByLabelText, getByText } = render(<ApplicantCard {...props} />);
        // const nameInput



    });
});