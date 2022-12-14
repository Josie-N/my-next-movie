import create from "zustand";

interface MovieListState {
    movieListType: string,
    changeMovieListType: (newMovieListType: string) => void;
}

export const useMovieListType = create<MovieListState>(
    (set) => ({
        // initial state
        movieListType: 'recommended',
        // methods for manipulating state
        changeMovieListType: (newMovieListType) => set({movieListType: newMovieListType})
    })
);
