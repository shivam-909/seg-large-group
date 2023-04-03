import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import EducationDropdown from '../Components/ProfilePage/EducationDropdown';

describe("EducationDropdown", () => {
  it('renders the component with default props', () => {
    const { getByPlaceholderText, getByText } = render(
      <EducationDropdown id={0} />
    );
    expect(getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(getByPlaceholderText('Grade (optional)')).toBeInTheDocument();
    expect(getByText('GCSE')).toBeInTheDocument();
    expect(getByText('A-level')).toBeInTheDocument();
    expect(getByText("Bachelor's")).toBeInTheDocument();
    expect(getByText("Master's")).toBeInTheDocument();
    expect(getByText('PhD')).toBeInTheDocument();
  });

  it('displays an error message if there are commas in grade or subject', () => {
    const { getByText, getByPlaceholderText } = render(
      <EducationDropdown id={0} subject="Maths, Science" grade="A," />
    );
    fireEvent.change(getByPlaceholderText('Subject'), {
      target:{ value: 'Maths,Science' },
    });
    fireEvent.change(getByPlaceholderText('Grade (optional)'), {
      target:{ value: 'A,' },
    });
    expect(getByText('Please remove all commas')).toBeInTheDocument();
  });
});
