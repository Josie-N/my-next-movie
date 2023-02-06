import React from 'react';
import helperStyles from "../../../assets/stylesheets/helper.module.css";
import noMovies from "../../../assets/images/noMovies.svg";

export default function EmptyScreen() {
  return (
    <>
      <h3 aria-hidden>Much wow, such empty!</h3>
      <h3 className={helperStyles.visuallyHidden}>Empty watchlist</h3>
      <p>Looks like this watchlist has no movies yet</p>
      <img src={noMovies} alt="" />
    </>
  );
}
