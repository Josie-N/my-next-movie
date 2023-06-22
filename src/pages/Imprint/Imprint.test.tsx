import {render, screen} from "@testing-library/react";
import Imprint from "./Imprint";

describe("Imprint", () => {
  window.scrollTo = jest.fn();

  beforeEach(() => {
    render(<Imprint />);
  });

  it("should display a link redirecting to telemedia german law", () => {
    expect(screen.getByRole('link', { name: /German law: Telemedia Act, Section 5/i })).toBeInTheDocument();
  });

  it("should include the application author's name", () => {
    expect(screen.getByText(/iozefina nagy/i)).toBeInTheDocument();
  });

  it("should have a heading that informs the user that this an imprint that reveals information about the publisher", () => {
    expect(screen.getByRole('heading', { name: /legal notice/i })).toHaveTextContent('Legal Notice');
  });
});
