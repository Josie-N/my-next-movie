import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {render, screen} from "@testing-library/react";

import useWatchlistName from "../../../../hooks/useWatchlistName";
import useQueryList from "../../../../hooks/useQueryList";
import LoadMoreMovies from "../LoadMoreMovies";
import {mockMovieData} from "../../../../utils/tests/mockMovieData";


const mockLoadMoreMovies = jest.fn();

const mockWatchlistName = useWatchlistName as jest.Mock<any>;
jest.mock("../../../../hooks/useWatchlistName");

const mockQueryList = useQueryList as jest.Mock<any>;
jest.mock("../../../../hooks/useQueryList");

const queryClient = new QueryClient();
const wrapper = ({children}: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe("LoadMoreMovies", () => {
    beforeEach(() => {
        mockQueryList.mockImplementation(() => ({
            isFetching: false,
        }));
    });

    describe("when any movie list is selected", () => {
        beforeEach(() => {
            mockWatchlistName.mockImplementation(() => ({
                watchlistNameAdded: true,
            }));
        });

        it("should NOT show a loading message inside button when movie list is not fetching data", () => {
            render(
                <LoadMoreMovies
                    movies={mockMovieData(10, 1000)} // 990 + 10 = 1000
                    handleLoadMoreMovies={mockLoadMoreMovies}
                    hasNextPage={true}
                    numberOfMoviesNotPaginated={990}
                />,
                {wrapper}
            );

            expect(screen.getByRole("button", {name: /Show more/i})).toBeInTheDocument();
            expect(screen.queryByRole("button", {name: /loading/i})).toBeNull();
        });

        it("should show a load more button if movie list has 6 movies minimum", () => {
            render(
                <LoadMoreMovies
                    movies={mockMovieData(5, 6)} // 1 + 5 = 6
                    handleLoadMoreMovies={mockLoadMoreMovies}
                    hasNextPage={true}
                    numberOfMoviesNotPaginated={1}
                />,
                {wrapper}
            );

            expect(screen.getByRole("button", {name: /Show more/i})).toBeInTheDocument();
            expect(screen.queryByRole("button", {name: /loading/i})).toBeNull();
        });

        it("should NOT show a load more button if movie list has less than 6 movies", () => {
            render(
                <LoadMoreMovies
                    movies={mockMovieData(5, 5)} // 5 + 0 = 5
                    handleLoadMoreMovies={mockLoadMoreMovies}
                    hasNextPage={false}
                    numberOfMoviesNotPaginated={0}
                />,
                {wrapper}
            );

            expect(screen.queryByRole("button")).toBeNull();
            expect(screen.queryByRole("button", {name: /Show more/i})).toBeNull();
        });
    });

    describe("when recommended watchlist is selected", () => {
        beforeEach(() => {
            mockWatchlistName.mockImplementation(() => ({
                watchlistNameRecommended: true,
            }));
        });

        it("should show the number of movies that have not been paginated yet", () => {
            render(
                <LoadMoreMovies
                    movies={mockMovieData(10, 1000)} // 10 + 990 = 1000
                    handleLoadMoreMovies={mockLoadMoreMovies}
                    hasNextPage={true}
                    numberOfMoviesNotPaginated={990}
                />,
                {wrapper}
            );

            expect(screen.queryByRole("button", {name: /990/i})).toBeInTheDocument();
            expect(screen.queryByRole("button", {name: /loading/i})).toBeNull();
        });

        it("should show a message and no button when there are no more movies left to paginate", () => {
          render(
              <LoadMoreMovies
                  movies={mockMovieData(10, 10)} // 0 + 10 = 10
                  handleLoadMoreMovies={mockLoadMoreMovies}
                  hasNextPage={false}
                  numberOfMoviesNotPaginated={0}
              />,
              {wrapper}
          );

          expect(screen.getByText(/No more movies to load./i)).toBeInTheDocument();
          expect(screen.queryByRole("button", {name: /loading/i})).toBeNull();
          expect(screen.queryByText(/Show more \(\d+\)/)).not.toBeInTheDocument();
        });
    });

    describe("when added or removed watchlist is selected", () => {
        beforeEach(() => {
            mockWatchlistName.mockImplementation(() => ({
                watchlistNameAdded: true,
            }));
        });

        it("should NOT show the number of movies left to paginate", () => {
            render(
                <LoadMoreMovies
                    movies={mockMovieData(5, 1000)} // 995 + 5 = 1000
                    handleLoadMoreMovies={mockLoadMoreMovies}
                    hasNextPage={true}
                    numberOfMoviesNotPaginated={995}
                />,
                {wrapper}
            );

            expect(screen.getByText(/Show more/i)).toBeInTheDocument();
            expect(screen.queryByText(/Show more \(\d+\)/)).not.toBeInTheDocument();
        });

        it("should NOT show a message or a button when there are no more movies left to paginate", () => {
          const { container } = render(
              <LoadMoreMovies
                  movies={mockMovieData(5, 5)} // 0 + 5 = 5
                  handleLoadMoreMovies={mockLoadMoreMovies}
                  hasNextPage={false}
                  numberOfMoviesNotPaginated={0}
              />,
              {wrapper}
          );

          expect(container).toBeEmptyDOMElement();
        });
    });
});
