import { MovieListType } from "../../../constants/constants";
import MovieListRecommended from "../MovieListRecommended/MovieListRecommended";
import { getAddedMovieList, getRecommendedMovieList, getRemovedMovieList } from "../../../services/movieList";
import MovieListUserAdded from "../MovieListUserAdded/MovieListUserAdded";
import MovieListRejected from "../MovieListRejected/MovieListRejected";

// Design pattern: strategy, policy, configuration
export default function getMovieListConfiguration (movieListType) {
  let c = {
    // cacheTime: 5 minute; default
  };
  switch (movieListType) {
    case MovieListType.Recommended:
      c.queryKey = 'list-recommended';
      c.listComponent = MovieListRecommended;
      c.getUrlFunction = getRecommendedMovieList;
      break;
    case MovieListType.Added:
      c.queryKey = 'list-added';
      c.listComponent = MovieListUserAdded;
      c.getUrlFunction = getAddedMovieList;
      // c.cacheTime = 8 mins;
      break;
    case MovieListType.Removed:
      c.queryKey = 'list-rejected';
      c.listComponent = MovieListRejected;
      c.getUrlFunction = getRemovedMovieList;
      break;
    default:
      throw Error('This movie list does not exist.');
  }
  return c;
}
