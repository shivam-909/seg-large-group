import React from 'react';
import { render, waitFor} from '@testing-library/react';
import CompanyJobCard from '../Components/MyJobs/CompanyJobCard';
import {BrowserRouter as Router} from 'react-router-dom';


test('render CompanyJobCard', () => {
    render(
        <Router>
            <CompanyJobCard />
        </Router>);
});