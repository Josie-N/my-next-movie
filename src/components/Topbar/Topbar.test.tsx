import React from "react";
import {Link, MemoryRouter} from "react-router-dom";

import {render, screen} from "@testing-library/react";
import Topbar from "./Topbar";

describe('Topbar', () => {
  it('should render without crashing', () => {
    render(<Topbar/>, {wrapper: MemoryRouter});
  });

  it('should render a level 1 header with the name of the application and its purpose', () => {
    render(<Topbar/>, {wrapper: MemoryRouter});
    expect(screen.getByRole('heading', {level: 1, name: /The tale of, a movie search database/i})).toBeInTheDocument();
  });

  it('should have a class that hides the level 1 header from sighted users', () => {
    render(<Topbar/>, {wrapper: MemoryRouter});

    expect(screen.getByTestId('accessible heading')).toBeInTheDocument();
    expect(screen.getByTestId('accessible heading').className).toBe('visuallyHidden');
  });

  it('should render the app logo AND the level 1 header hidden from sighted users', () => {
    render(<Topbar/>, {wrapper: MemoryRouter});

    expect(screen.getByTestId('accessible heading')).toBeInTheDocument();
    expect(screen.getByAltText(/True tale of/i)).toBeInTheDocument();
  });

  it('should provide a link with a path that redirects back to the home page', () => {
    render(<Topbar/>, {wrapper: MemoryRouter});

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
