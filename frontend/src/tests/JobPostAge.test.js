import { render } from "@testing-library/react";
import JobPostAge from "../Components/SearchPage/JobPostAge";

describe('JobPostAge', () => {
  it('renders "Posted today" when age is 0', () => {
    const { getByText } = render(<JobPostAge age={0} />);
    expect(getByText('Posted today')).toBeInTheDocument();
  });

  it('renders "Posted 1 day ago" when age is 1', () => {
    const { getByText } = render(<JobPostAge age={1} />);
    expect(getByText('Posted 1 day ago')).toBeInTheDocument();
  });

  it('renders "Posted 2 days ago" when age is 2', () => {
    const { getByText } = render(<JobPostAge age={2} />);
    expect(getByText('Posted 2 days ago')).toBeInTheDocument();
  });
});
