const findMatchingGenres = (fullarray, match) => {
  const filteredArray = fullarray.filter((genre) => match.includes(genre.id)); //filters to get the ones that matches with this movie
  const genresNamesArray = filteredArray.map((genre) => genre.name);
  const joinedArray = genresNamesArray.join(", ");

  return joinedArray;
};

export { findMatchingGenres };
