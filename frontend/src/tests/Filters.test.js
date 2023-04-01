import { render, screen } from '@testing-library/react';
import Filters from '../Components/SearchPage/Filters';
import userEvent from '@testing-library/user-event';

const mockJobs = [
  {
    age: 1,
    distance: 10,
    compensation: ['50000', 'year'],
    type: 'Full-time',
    schedule: 'Monday-Friday',
    qualifications: 'Bachelor degree',
    industry: 'Technology',
    location: 'New York',
    companyName: 'Example Company',
  },
  {
    age: 3,
    distance: 20,
    compensation: ['40', 'hour'],
    type: 'Part-time',
    schedule: 'Weekends',
    qualifications: 'High school diploma',
    industry: 'Retail',
    location: 'Los Angeles',
    companyName: 'Test Company',
  },
];

describe('Filters', () => {
  it('renders the filters button and job list', () => {
    render(<Filters jobs={mockJobs} />);
    const filtersButton = screen.getByRole('button', { name: /filters/i });
    const jobList = screen.getByRole('list', { name: /job list/i });
    expect(filtersButton).toBeInTheDocument();
    expect(jobList).toBeInTheDocument();
  });

  it('shows the filters when the button is clicked', async () => {
    render(<Filters jobs={mockJobs} />);
    const filtersButton = screen.getByRole('button', { name: /filters/i });
    const ageFilter = screen.getByLabelText(/age/i);
    const distanceFilter = screen.getByLabelText(/distance/i);
    expect(ageFilter).not.toBeVisible();
    expect(distanceFilter).not.toBeVisible();
    userEvent.click(filtersButton);
    expect(ageFilter).toBeVisible();
    expect(distanceFilter).toBeVisible();
  });

  it('filters jobs correctly when the form is submitted', async () => {
    render(<Filters jobs={mockJobs} />);
    const filtersButton = screen.getByRole('button', { name: /filters/i });
    userEvent.click(filtersButton);

    const ageFilter = screen.getByLabelText(/age/i);
    const distanceFilter = screen.getByLabelText(/distance/i);
    const salaryFilter = screen.getByLabelText(/salary/i);
    const fullTimeFilter = screen.getByLabelText(/full-time/i);
    const weekendsFilter = screen.getByLabelText(/weekends/i);
    const bachelorFilter = screen.getByLabelText(/bachelor degree/i);
    const technologyFilter = screen.getByLabelText(/technology/i);
    const newYorkFilter = screen.getByLabelText(/new york/i);
    const exampleFilter = screen.getByLabelText(/example company/i);

    userEvent.type(ageFilter, '2');
    userEvent.type(distanceFilter, '15');
    userEvent.type(salaryFilter.querySelector('#min-salary'), '40000');
    userEvent.type(salaryFilter.querySelector('#max-salary'), '60000');
    userEvent.click(fullTimeFilter);
    userEvent.click(weekendsFilter);
    userEvent.click(bachelorFilter);
    userEvent.click(technologyFilter);
    userEvent.click(newYorkFilter);
    userEvent.click(exampleFilter);
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/1 job found/i)).toBeInTheDocument();
    expect(screen.getByText(/example company/i)).toBeInTheDocument();
    expect(screen.queryByText(/test company/i)).not.toBeInTheDocument();
  });
});
