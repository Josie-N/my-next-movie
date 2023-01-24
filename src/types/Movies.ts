export type Movies = {
  data: MovieData[],
  pagination: {
    totalItems: number,
    totalPages: number
  }
}

export type MovieData = {
  certificate: string,
  director: string,
  genre: string,
  imdbRating: number,
  metaScore: string,
  name: string,
  overview: string,
  releaseYear: number,
  runtime: string,
  _id: string
}
