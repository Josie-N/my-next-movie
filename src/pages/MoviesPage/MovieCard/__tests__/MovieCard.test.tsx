import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import {mockMovies} from "../../../../utils/tests/mockMovieData";
import {wrapper} from "../../../../utils/tests/queryClientProviderWrapper";
import useWatchlistName from "../../../../hooks/useWatchlistName";
import MovieCard from "../MovieCard";

const mockWatchlistName = useWatchlistName as jest.Mock<any>;
jest.mock("../../../../hooks/useWatchlistName");

describe('MovieCard', () => {
  describe('when a movie card is open', () => {
    beforeEach(() => {
      mockWatchlistName.mockImplementation(() => ({
        watchlistNameRecommended: true,
      }));

      render(
        <MovieCard
          movie={mockMovies(1)[0]}
          hasPrimaryActionButtons={true}
          dataTestID="movie-card"
        >
          Movie card details: description, genre, rating
        </MovieCard>,
        {wrapper}
      );
    });

    it('should show the movie card details, including the title', () => {
      fireEvent.mouseEnter(screen.getByTestId('movie-card'));

      expect(screen.getByText(/movie card details: description, genre, rating/i)).toBeInTheDocument();
    });

    // should have a movie card id (ex: "card-index-7")
    // should return an empty string if no movie card id is provided

    // when a movie card is open and hovered over
    it('should show an ADD button', () => {
      fireEvent.mouseEnter(screen.getByTestId('movie-card'));

      expect(screen.getByRole('button', {name: /add/i})).toBeInTheDocument();
    });

    it('should show a REMOVE button', () => {
      fireEvent.mouseEnter(screen.getByTestId('movie-card'));

      expect(screen.getByRole('button', {name: /remove/i})).toBeInTheDocument();
    });

    // Only for added and removed watchlists
    it('should show a BACK button', () => {
      mockWatchlistName.mockImplementation(() => ({
        watchlistNameRecommended: false
      }));

      fireEvent.mouseEnter(screen.getByTestId('movie-card'));

      expect(screen.getByRole('button', {name: /send back/i})).toBeInTheDocument();
    });

    // it('should show a REMEMBER button icon', () => {});

    // when hovering over the REMEMBER button icon:
       // it should show a button label "Remember"
       // it should NOT show the ADD and REMOVE buttons

  });


  // added and removed watchlists should not show a REMEMBER button icon

  // when a movie card is bookmarked
     // should show the movie card details, including the title
     // should not collapse the movie card

  describe('when a movie card is collapsed', () => {
    beforeEach(() => {
      mockWatchlistName.mockImplementation(() => ({
        watchlistNameRecommended: true,
      }));
    });

    it('should be able to collapse/ hide movie card details', () => {
      render(
        <MovieCard
          movie={mockMovies(1)[0]}
          canBeCollapsed={true}
          dataTestID="movie-card"
        >
          Movie card details: description, genre, rating
        </MovieCard>,
        {wrapper}
      );

      fireEvent.click(screen.getByTestId('movie-card'));

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.queryByText(/movie card details: description, genre, rating/i)).toBeNull();
    });

    it('should reopen when clicked again', () => {
      render(
        <MovieCard
          movie={mockMovies(1)[0]}
          canBeCollapsed={true}
          dataTestID="movie-card"
        >
          Movie card details: description, genre, rating
        </MovieCard>,
        {wrapper}
      );

      fireEvent.doubleClick(screen.getByTestId('movie-card'));

      expect(screen.getByText(/movie card details: description, genre, rating/i)).toBeInTheDocument();
    });

    it('should NOT show an ADD or REMOVE button', () => {
      render(
        <MovieCard
          movie={mockMovies(1)[0]}
          hasPrimaryActionButtons={true}
          canBeCollapsed={true}
          dataTestID="movie-card"
        >
          Movie card details: description, genre, rating
        </MovieCard>,
        {wrapper}
      );

      fireEvent.click(screen.getByTestId('movie-card'));
      fireEvent.mouseEnter(screen.getByTestId('movie-card-collapsed'));

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.queryByRole('button', {name: /add/i})).toBeNull();
      expect(screen.queryByRole('button', {name: /remove/i})).toBeNull();
    });

    // Only for added and removed watchlists
    it('should NOT show a BACK button', () => {
      mockWatchlistName.mockImplementation(() => ({
        watchlistNameRecommended: false,
        watchlistNameAdded: true,
      }));

      render(
        <MovieCard
          movie={mockMovies(1)[0]}
          hasPrimaryActionButtons={true}
          canBeCollapsed={true}
          dataTestID="movie-card"
        >
          Movie card details: description, genre, rating
        </MovieCard>,
        {wrapper}
      );

      fireEvent.click(screen.getByTestId('movie-card'));
      fireEvent.mouseEnter(screen.getByTestId('movie-card-collapsed'));

      expect(screen.queryByRole('button', {name: /send back/i})).toBeNull();
    });

    // should not show a REMEMBER button icon
  });
});
