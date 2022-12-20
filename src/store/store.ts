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

    totalPageCount: number,
    setTotalPageCount: (newPageCount: number) => void,

    currentPage: number,
    setCurrentPage: (state: number) => void,
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
        setUsername: (newUsername) => set(({username: newUsername})),

        totalPageCount: 0,
        setTotalPageCount: (newPageCount) => set({totalPageCount: newPageCount}),

        currentPage: 1,
        setCurrentPage: () => set((state) => ({currentPage: state.currentPage + 1})),
    })
);
