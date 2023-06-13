import {useStore} from "../store/store";
import {MovieListType} from "../constants/constants";

export default function useWatchlistName() {
    const watchlistName = useStore(state => state.movieListType);

    const watchlistNameRecommended = watchlistName === MovieListType.Recommended;
    const watchlistNameAdded = watchlistName === MovieListType.Added;
    const watchlistNameRemoved = watchlistName === MovieListType.Removed;
    const watchlistEmpty = watchlistName === '';

    return {
        watchlistNameRecommended,
        watchlistNameAdded,
        watchlistNameRemoved,
        watchlistEmpty
    }
}
