export const URL = {
  movies: 'https://josie-moviehut.herokuapp.com/api/movies',
  movie: 'https://josie-moviehut.herokuapp.com/api/movie',
  user: 'https://josie-moviehut.herokuapp.com/api/user'
} as const;

// Types of movie lists available to user
export enum MovieListType {
  Recommended = 'recommended',
  Added = 'added',
  Removed = 'removed'
}

// Types of emoji available in app
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
  Copy = "COPY"
}

// How many movies are displayed per page in each movie list
export const numberOfMoviesPerPage = 5;

export const initialPage = 1;
