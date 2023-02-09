export const path = 'https://josie-moviehut.herokuapp.com';

export const URL = {
  movies: `${path}/api/movies`,
  movie: `${path}/api/movie`,
  user: `${path}/api/user`
} as const;

// Types of movie lists available to user
export enum MovieListType {
  Recommended = 'recommended',
  Added = 'added',
  Removed = 'removed'
}

// Types of emoji available in app
// All skin color types supported
export enum Emoji {
  ThumbsUp = '👍',
  ThumbsDown = '👎🏻',
  PointingDown = '👇',
  PointingLeft = '👈🏿',
  Eyes = '👀'
}

// Types of button labels
export enum ButtonLabel {
  Add = 'ADD',
  Remove = 'REMOVE',
  Back = 'SEND BACK',
  ShowMore = 'SHOW MORE'
}

// How many movies are displayed per page in each movie list
export const numberOfMoviesPerPage = 5;

export const initialPage = 1;
