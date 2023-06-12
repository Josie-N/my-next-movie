import React from 'react';
import noMovies from "../../../assets/images/noMovies.svg";
import { Heading } from '../Heading/Heading';

export default function EmptyScreen() {
  return (
    <>
      <Heading level="h3" hideFromScreenReader>Much wow, such empty!</Heading>
      <Heading level="h3" hideTextVisually>Empty watchlist</Heading>
      <p>Looks like this watchlist has no movies yet</p>
      <img src={noMovies} alt="" />
    </>
  );
}
