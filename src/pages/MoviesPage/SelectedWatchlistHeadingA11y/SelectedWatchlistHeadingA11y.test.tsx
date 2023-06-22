import React from "react";
import { render , screen } from "@testing-library/react";
import SelectedWatchlistHeadingA11y from "./SelectedWatchlistHeadingA11y";
import useWatchlistName from "../../../hooks/useWatchlistName";

const mockedWatchlistName = useWatchlistName as jest.Mock<any>;
jest.mock("../../../hooks/useWatchlistName");

describe('SelectedWatchlistHeadingA11y', () => {
  it('should display custom heading title when selecting recommended watchlist', () => {
    mockedWatchlistName.mockImplementation(() => ({
      watchlistNameRecommended: true,
      watchlistNameAdded: false,
      watchlistNameRemoved: false,
      watchlistEmpty: false,
    }));
    render(<SelectedWatchlistHeadingA11y />);

    expect(screen.getByRole('heading', { name: /Browse all movies available/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /My added watchlist/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /My removed watchlist/i })).toBeNull();
  });

  it('should display custom heading title when selecting added watchlist', () => {
    mockedWatchlistName.mockImplementation(() => ({
      watchlistNameRecommended: false,
      watchlistNameAdded: true,
      watchlistNameRemoved: false,
      watchlistEmpty: false,
    }));
    render(<SelectedWatchlistHeadingA11y />);

    expect(screen.getByRole('heading', { name: /My added watchlist/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Browse all movies available/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /My removed watchlist/i })).toBeNull();
  });

  it('should display custom heading title when selecting removed watchlist', () => {
    mockedWatchlistName.mockImplementation(() => ({
      watchlistNameRecommended: false,
      watchlistNameAdded: false,
      watchlistNameRemoved: true,
      watchlistEmpty: false,
    }));
    render(<SelectedWatchlistHeadingA11y />);

    expect(screen.getByRole('heading', { name: /My removed watchlist/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Browse all movies available/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /My added watchlist/i })).toBeNull();
  });

  it('should display no heading title when no watchlist is selected', () => {
    mockedWatchlistName.mockImplementation(() => ({
      watchlistNameRecommended: false,
      watchlistNameAdded: false,
      watchlistNameRemoved: false,
      watchlistEmpty: true,
    }));
    render(<SelectedWatchlistHeadingA11y />);

    expect(screen.queryByRole('heading', { name: /Browse all movies available/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /My added watchlist/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /My removed watchlist/i })).toBeNull();
  });
});
