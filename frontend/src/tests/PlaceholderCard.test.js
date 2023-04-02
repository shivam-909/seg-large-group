import { render, screen, fireEvent } from "@testing-library/react";
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

     const prefixAndcontent = screen.getByText(`${props.prefix}${props.content}`);
     expect(prefixAndcontent).toBeInTheDocument();

   });

   it('calls the onclick function when clicked', () => {
     render(<PlaceholderCard {...props} />);

     const placeholderCard = screen.getByRole('img');
     fireEvent.click(placeholderCard);

     expect(props.onclick).toHaveBeenCalled();
   });

 });
