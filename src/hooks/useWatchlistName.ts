import {useStore} from "../store/store";
import {ADDED, RECOMMENDED, REMOVED} from "../constants/constants";

export default function useWatchlistName() {
    const watchlistName = useStore(state => state.movieListType);

    const watchlistNameRecommended: boolean = watchlistName === RECOMMENDED;
    const watchlistNameAdded: boolean = watchlistName === ADDED;
    const watchlistNameRemoved: boolean = watchlistName === REMOVED;

    return {
        watchlistNameRecommended,
        watchlistNameAdded,
        watchlistNameRemoved
    }
}
