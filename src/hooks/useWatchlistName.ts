import {useStore} from "../store/store";
import {ADDED, RECOMMENDED, REMOVED} from "../constants/constants";

export default function useWatchlistName() {
    const watchlistName = useStore(state => state.movieListType);

    const watchlistNameRecommended = watchlistName === RECOMMENDED;
    const watchlistNameAdded = watchlistName === ADDED;
    const watchlistNameRemoved = watchlistName === REMOVED;

    return {
        watchlistNameRecommended,
        watchlistNameAdded,
        watchlistNameRemoved
    }
}
