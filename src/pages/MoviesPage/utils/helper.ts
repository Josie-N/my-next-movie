import {randanimalSync} from "randanimal";

interface moviesProps {
    certificate: string,
    director: string,
    genre: string,
    imdbRating: number,
    metaScore: string,
    name: string,
    overview: string,
    releaseYear: number,
    runtime: string
    _id: string
}

export const getFilterMovieFromList = (movies: moviesProps[], movieId: string
): moviesProps[] => {
    return movies.filter(movies => movieId !== movies._id);
}

// Converts a string to lowercase letters
export const getFormatToLowercase = (word: string): string => {
    return word.toLowerCase();
}

// Creates a two word username (Adjective Noun)
export const getGenerateUsername = (): string => {
    return randanimalSync();
}
