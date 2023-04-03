import ApplyPage from "../Components/ApplyPage/ApplyPage";
import {render} from "@testing-library/react";

describe('ApplyPage', () => {



    // render page when application doesn't exist

    // before each test, create a job listing with optional and required fields

    // render page when application exists
    test('renders the ApplyPage', () => {
        const { getByText } = render(<ApplyPage />);
        expect(getByText('You are applying for the role of:')).toBeInTheDocument();
        console.log(screen.findByRole("id", { name: "id" }));
    });

    // submit form with required fields empty
});