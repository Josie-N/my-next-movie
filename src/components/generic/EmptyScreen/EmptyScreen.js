import React from 'react';
import noMovies from "../../../assets/images/noMovies.svg";

function EmptyScreen () {
  return (
    <>
      <h3 aria-hidden>Much wow, such empty!</h3>
      <p>Looks like this watchlist has no movies yet</p>
      <img src={noMovies} alt="" />
    </>
  );
}

export default EmptyScreen;