import React from "react";
import PropTypes from "prop-types";

import styles from "./Homepage.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";

import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/generic/Spinner/Spinner";
import Button from "../../components/generic/Button/Button";

import PaginationNumber from "../../components/PaginationNumber/PaginationNumber";
import PaginationNumberScreenReader from "../../components/PaginationNumberScreenReader/PaginationNumberScreenReader";
import { WatchlistSidebar } from "../../components/WatchlistSidebar/WatchlistSidebar";


const Homepage = ({ isLoading, movies, totalPageCount, currentPage, numberOfMoviesPerPage, loadMoreMovies }) => {
  return (
    <>
      <div className={helperStyles.maxWidthDesktop}>
        <main className={styles.mainContentContainer}>
          <h2 className={helperStyles.visuallyHidden}>
            Browse all movies available:
          </h2>
          <div>
            {/*To do: move into its own MovieCardPage component*/}
            {isLoading ?
              <div className={styles.movieCardContainerSkeleton}>
                <Spinner />
              </div>
              :
              <div className={styles.movieCardContainer} aria-live="polite">
                {movies && movies.map((movie, index) => {
                  const quotient = index / numberOfMoviesPerPage;
                  const pageNumber = Math.floor(quotient) + 1;

                  const divisionRemainder = index % numberOfMoviesPerPage;

                  // Output: 4, 9, 14, 19, ...
                  const indexOfLastCardOnEachPage = (numberOfMoviesPerPage - 1);
                  const showPageNumberOnLastCard = divisionRemainder === indexOfLastCardOnEachPage;

                  // Output: 0, 5, 10, 15, ...
                  const indexOfFirstCardOnEachPage = (numberOfMoviesPerPage - 5);
                  const showPageNumberOnFirstCard = divisionRemainder === indexOfFirstCardOnEachPage

                  return (
                    <>
                      <PaginationNumberScreenReader
                        pageNumber={pageNumber}
                        showPageNumberOnFirstCard={showPageNumberOnFirstCard}
                      />
                      <MovieCard key={movie._id}
                                 movie={movie}
                      />
                      <PaginationNumber
                        pageNumber={pageNumber}
                        showPageNumberOnFirstCard={showPageNumberOnFirstCard}
                        showPageNumberOnLastCard={showPageNumberOnLastCard}
                      />
                    </>
                  );
                })}
              </div>
            }
            <div className={styles.showMoreMovies}>
              {
                (currentPage === totalPageCount) ?
                  <h4>No more movies to load.</h4>
                  :
                  <Button ariaLabel="Show more movies" hasIcon icon="👇" type="button"
                          handleButtonClick={loadMoreMovies}>
                    <span>SHOW MORE</span>
                  </Button>
              }
            </div>
          </div>
          {isLoading ?
            <Spinner /> :
            <WatchlistSidebar />
          }
        </main>
      </div>
    </>
  )
}

Homepage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfMoviesPerPage: PropTypes.number.isRequired,
  loadMoreMovies: PropTypes.func.isRequired,
}

export default Homepage;
