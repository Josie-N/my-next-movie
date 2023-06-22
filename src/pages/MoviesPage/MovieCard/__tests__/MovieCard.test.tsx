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
  });

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
  });
});
