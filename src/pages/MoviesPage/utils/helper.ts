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
    return movies.filter(movies => movieId !== movies._id)
}