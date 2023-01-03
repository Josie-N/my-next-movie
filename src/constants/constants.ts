export const baseURL = 'https://josie-moviehut.herokuapp.com/api/movies';
export const baseURL_2 = 'https://josie-moviehut.herokuapp.com/api/movie';

// Types of movie lists available to user
export enum MovieListType {
    Recommended = 'recommended',
    Added = 'added',
    Removed = 'removed'
}

// How many movies are displayed per page in each movie list
export const numberOfMoviesPerPage = 5;

export const initialPage = 1;