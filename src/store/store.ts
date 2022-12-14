import create from "zustand";

interface StoreState {
    movieListType: string,
    howManyMoviesAddedList: number,
    howManyMoviesRemovedList: number,
    changeMovieListType: (newMovieListType: string) => void,
    increaseHowManyMoviesAddedList: (state: number) => void,
    increaseHowManyMovieRemovedList: (state: number) => void,
}

export const useStore = create<StoreState>(
    (set) => ({
        // initial state
        movieListType: 'recommended',
        howManyMoviesAddedList: 0,
        howManyMoviesRemovedList: 0,
        // methods for manipulating state
        changeMovieListType: (newMovieListType) => set({movieListType: newMovieListType}),
        increaseHowManyMoviesAddedList: () => set((state) => ({howManyMoviesAddedList: state.howManyMoviesAddedList + 1})),
        increaseHowManyMovieRemovedList: () => set((state) => ({howManyMoviesRemovedList: state.howManyMoviesRemovedList + 1}))
    })
);
