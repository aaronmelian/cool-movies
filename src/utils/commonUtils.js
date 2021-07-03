export const frecuentUrls = {
  baseImgUrls: "https://image.tmdb.org/t/p/w500/",
};

export const formatDateToEurope = (date) => {
  let newDate = new Date(date);
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  if (!month || !year) {
    return "N/A";
  }

  if (month < 10) {
    return `0${month}-${year}`;
  } else {
    return `${month}-${year}`;
  }
};

const fonts = ["DelaGothicOne", "MateSC", "IndieFlower"];

export const fontClassGetterByIndex = (index) => {
  return fonts[index % 3];
};

export const checkIfMovieIsOnList = (movieList, movieId) => {
  const idInt = parseInt(movieId);
  return !!movieList.find((mov) => {
    return mov.id === idInt;
  });
};

export const movieToStoreHandler = (state, id, movieDetails) => {
  if (!movieDetails) return false;
  const isMovie = checkIfMovieIsOnList(state.movies, id);
  if (state.movies && isMovie) {
    state.removeMovie(parseInt(id));
  } else {
    state.addMovie(movieDetails);
  }
};
