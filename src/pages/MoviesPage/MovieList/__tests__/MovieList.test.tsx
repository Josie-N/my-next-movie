import React from "react";
import {render, screen} from "@testing-library/react";
import MovieList from "../MovieList";
import {generateMovieData} from "../__mocks__/mockedMovieData";

describe("MovieList", () => {
  it("should render without crashing", () => {
    render(<MovieList movies={generateMovieData(1, 1)}/>);
  });

  it("should render the correct number of movies", () => {
    const numberOfMovies = 5;
    render(<MovieList movies={generateMovieData(numberOfMovies, 5)}/>);
    const amountOfMovies = screen.getAllByRole("heading", {level: 4});

    expect(amountOfMovies).toHaveLength(numberOfMovies);
  });

  it("should render no pagination number when less than 5 movies are available", () => {
    const numberOfMovies = 2;
    render(<MovieList movies={generateMovieData(numberOfMovies, 2)}/>);

    const amountOfMovies = screen.getAllByRole("heading", {level: 4});
    expect(amountOfMovies).toHaveLength(numberOfMovies);

    const pagination = screen.queryByTestId('pagination-number');
    expect(pagination).toBeNull();
  });

  it("should render pagination number 1 when at least 5 movies are available", () => {
    const numberOfMovies = 5;
    render(<MovieList movies={generateMovieData(numberOfMovies, 5)}/>);

    const amountOfMovies = screen.getAllByRole("heading", {level: 4});
    expect(amountOfMovies).toHaveLength(numberOfMovies);

    const pagination = screen.getByTestId('pagination-number');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent('1');
  });

  it("should increase pagination count every 5 movie cards", () => {
    const numberOfMovies = 10;
    render(<MovieList movies={generateMovieData(numberOfMovies, 20)}/>);

    const amountOfMovies = screen.getAllByRole("heading", {level: 4});
    expect(amountOfMovies).toHaveLength(numberOfMovies);

    const pagination = screen.queryAllByTestId('pagination-number');
    const page_2 = pagination.find((element) => element.textContent === '2');

    expect(page_2).toBeInTheDocument();
    expect(page_2).toHaveTextContent('2');
  });

  it("should provide no accessible pagination number for page 1", () => {
    const numberOfMovies = 13;
    render(<MovieList movies={generateMovieData(numberOfMovies, 13)}/>);

    const amountOfMovies = screen.getAllByRole("heading", {level: 4});
    expect(amountOfMovies).toHaveLength(numberOfMovies);

    const page_1 = screen.queryByText('Page 1');
    expect(page_1).not.toBeInTheDocument();
  });

  it("should provide an accessible pagination number starting with page 2", () => {
    const numberOfMovies = 12;
    render(<MovieList movies={generateMovieData(numberOfMovies, 12)}/>);

    const amountOfMovies = screen.getAllByRole("heading", {level: 4});
    expect(amountOfMovies).toHaveLength(numberOfMovies);

    const page_2 = screen.getByText('Page 2');
    expect(page_2).toBeInTheDocument();
  });
});
