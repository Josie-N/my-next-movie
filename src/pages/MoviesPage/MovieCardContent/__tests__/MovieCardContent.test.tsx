import React from "react";
import {render, screen} from "@testing-library/react";
import {MovieCardContent} from "../MovieCardContent";
import {mockMovies} from "../../../../utils/tests/mockMovieData";

describe('MovieCardContent', () => {
  beforeEach(() => {
    render(<MovieCardContent movie={mockMovies(1)[0]}/>);
  });

  it("should contain the title of the movie", () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it("should contain a paragraph describing the movie", () => {
    expect(screen.getByTestId('movie-description')).toBeInTheDocument();
  });

  it("should contain the rating of the movie", () => {
    expect(screen.getByTestId('movie-rating')).toBeInTheDocument();
    // Assert that the rating is a number
    expect(screen.getByTestId('movie-rating')).toHaveTextContent(/\d+/);
  });

  it("should contain the genre of the movie", () => {
    expect(screen.getByTestId('movie-genre')).toBeInTheDocument();
  });
});