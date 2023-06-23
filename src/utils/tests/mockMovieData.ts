import {getOrdinalSuffix} from "../helper/getOrdinalSuffix";

export const mockMovieData = (numberOfMovies: number, totalItems: number) => {
  return {
    data: mockMovies(numberOfMovies),
    pagination: {
      totalItems: totalItems,
    }
  };
}

export const mockMovies = (num: number) => {
  const result = [];

  // Increment the movie number
  for (let i = 0; i < num; i++) {
    // Generate unique id
    const randomNumber = String(Math.floor(Math.random() * 100000));

    const newData = {
      certificate: `${i + 1}${getOrdinalSuffix(i + 1)} certificate`,
      director: `${i + 1}${getOrdinalSuffix(i + 1)} director`,
      genre: `${i + 1}${getOrdinalSuffix(i + 1)} genre`,
      imdbRating: 10 + i * 10,
      metaScore: `${i + 1}${getOrdinalSuffix(i + 1)} metaScore`,
      name: `${i + 1}${getOrdinalSuffix(i + 1)} movie`,
      overview: `${i + 1}${getOrdinalSuffix(i + 1)} overview`,
      releaseYear: 1000 + i * 1000,
      runtime: `${i + 1}${getOrdinalSuffix(i + 1)} runtime`,
      _id: randomNumber,
    };

    result.push(newData);
  }

  return result;
};
