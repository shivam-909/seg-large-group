import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import Applicants from '../Components/Applicants/Applicants';
import ApplicantCard from "../Components/Applicants/ApplicantCard";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('ApplicantsCard', () => {
    it('renders component', () => {
        render (<Applicants/>)
    });

    it('renders navbar', () => {
        render(<ApplicantCard/>);
    });
});
test ('renders navbar', () => {
    render(
        <Applicants/>);
    const navBar = screen.queryByTestId('navbar');
    waitFor(() => expect(navBar).toBeInTheDocument());
});

// test('button renders', () => {
//     render(<Applicants/>);
// })

