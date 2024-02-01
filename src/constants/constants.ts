export const path = 'https://josie-moviehut.herokuapp.com';

export const URL = {
  // request a movie list (ex: recommended, added, removed)
  movies: `${path}/api/movies`,
  // send a movie from recommended list to a watchlist (added or removed)
  movie: `${path}/api/movie`,
  // request username information
  user: `${path}/api/user`
} as const;

// Types of movie lists available to user
export enum MovieListType {
  Recommended = 'recommended',
  Added = 'added',
  Removed = 'removed'
}

// Types of emoji available to be rendered
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
  ShowMore = 'SHOW MORE',
  Cancel = 'CANCEL',
  Create = 'CREATE',
  Remember = 'REMEMBER'
}

// How many movies are displayed per page in each movie list
export const numberOfMoviesPerPage = 5;

export const initialPage = 1;
