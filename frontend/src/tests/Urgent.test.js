import React from 'react';
import { render, screen } from "@testing-library/react";
import Urgent from "../Components/SearchPage/Urgent";

describe('Urgent component', () => {
  it('should render when props.urgent is true', () => {
    const props = {
      urgent: true,
      icon: 'urgent-icon.png'
    };
    const { getByText, getByAltText } = render(<Urgent{...props} />);
    const urgentText = screen.queryByText('Urgently needed');
    const urgentIcon = screen.queryByAltText('Urgent icon');
    expect(urgentText).toBeInTheDocument();
    expect(urgentIcon).not.toBeInTheDocument();
  });

  it('should not render when props.urgent is false', () => {
    const props = {
      urgent: false,
      icon: 'urgent-icon.png'
    };
    const { getByText, getByAltText } = render(<Urgent{...props} />);
    const urgentText = screen.queryByText('Urgently needed');
    const urgentIcon = screen.queryByAltText('Urgent icon');
    expect(urgentText).not.toBeInTheDocument();
    expect(urgentIcon).not.toBeInTheDocument();
  });
});
