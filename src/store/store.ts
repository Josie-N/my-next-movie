import create from "zustand";

interface StoreState {
    movieListType: string,
    changeMovieListType: (newMovieListType: string) => void,

    howManyMoviesAddedList: number,
    increaseHowManyMoviesAddedList: (state: number) => void,

    howManyMoviesRemovedList: number,
    increaseHowManyMovieRemovedList: (state: number) => void,

    username: string,
    setUsername: (newUsername: string) => void,
}

export const useStore = create<StoreState>(
    (set) => ({
        movieListType: 'recommended',
        changeMovieListType: (newMovieListType) => set({movieListType: newMovieListType}),

        howManyMoviesAddedList: 0,
        increaseHowManyMoviesAddedList: () => set((state) => ({howManyMoviesAddedList: state.howManyMoviesAddedList + 1})),

        howManyMoviesRemovedList: 0,
        increaseHowManyMovieRemovedList: () => set((state) => ({howManyMoviesRemovedList: state.howManyMoviesRemovedList + 1})),

        username: '',
        setUsername: (newUsername) => set(({username: newUsername}))
    })
);
