import { render , screen, fireEvent } from "@testing-library/react";
import PlaceholderCard from "../Components/SearchPage/PlaceholderCard";

describe('PlaceholderCard', () => {
  const props = {
    img:'test-image',
    prefix:'$',
    content:'100,000',
    onclick:jest.fn()
  };

  it('renders the component with correct props', () => {
    render(<PlaceholderCard{...props} />);

    const img = screen.getByAltText('');
    expect(img.src).toContain(props.img);

    const prefixRegex = new RegExp(`\\${props.prefix}${props.content}`);
    const prefix = screen.getByRole('button').querySelector('p');
    expect(prefix).toHaveTextContent(prefixRegex);

  });

  it('calls the onclick function when clicked', () => {
    render(<PlaceholderCard {...props} />);

    const placeholderCard = screen.getByRole('button');
    fireEvent.click(placeholderCard);

    expect(props.onclick).toHaveBeenCalled();
  });

});
