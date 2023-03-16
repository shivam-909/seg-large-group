//import React from 'react';
import { render } from "@testing-library/react";
import Urgent from "../Components/SearchPage/Urgent";

describe('Urgent component', () => {
  it('should render when props.urgent is true', () => {
    const props = {
      urgent: true,
      icon: 'urgent-icon.png'
    };
    const { getByText, getByAltText } = render(<Urgent{...props} />);
    const urgentText = getByText('Urgently needed');
    const urgentIcon = getByAltText('Urgent icon');
    expect(urgentText).toBeInTheDocument();
    expect(urgentIcon).toBeInTheDocument();
  });

  it('should not render when props.urgent is false', () => {
    const props = {
      urgent: false,
      icon: 'urgent-icon.png'
    };
    const { getByText, getByAltText } = render(<Urgent{...props} />);
    const urgentText = getByText('Urgently needed');
    const urgentIcon = getByAltText('Urgent icon');
    expect(urgentText).not.toBeInTheDocument();
    expect(urgentIcon).not.toBeInTheDocument();
  });
});
