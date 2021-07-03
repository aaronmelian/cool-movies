import {
  formatDateToEurope,
  fontClassGetterByIndex,
  checkIfMovieIsOnList,
  movieToStoreHandler,
} from "./commonUtils";
import { mockedMovieData } from "./mocks";

test("formatDate", () => {
  expect(formatDateToEurope("2021-09-08")).toEqual("09-2021");
  expect(formatDateToEurope("2021-9-8")).toEqual("09-2021");
  expect(formatDateToEurope("2021-12-8")).toEqual("12-2021");
  expect(formatDateToEurope("2018-13-24")).toEqual("N/A");
  expect(formatDateToEurope("2018-08-34")).toEqual("N/A");
});

test("getFonts", () => {
  const fonts = ["DelaGothicOne", "MateSC", "IndieFlower"];
  expect(fontClassGetterByIndex(0)).toEqual(fonts[0]);
  expect(fontClassGetterByIndex(1)).toEqual(fonts[1]);
  expect(fontClassGetterByIndex(2)).toEqual(fonts[2]);
  expect(fontClassGetterByIndex(3)).toEqual(fonts[0]);
});

test("isMovieOnList", () => {
  const movies = [
    { id: 1, name: "Movie1" },
    { id: 2, name: "Movie2" },
    { id: 3, name: "Movie3" },
  ];
  expect(checkIfMovieIsOnList(movies, 1)).toEqual(true);
  expect(checkIfMovieIsOnList(movies, 2)).toEqual(true);
  expect(checkIfMovieIsOnList(movies, 4)).toEqual(false);
  expect(checkIfMovieIsOnList(movies, -4)).toEqual(false);
  expect(checkIfMovieIsOnList(movies, "Movie1")).toEqual(false);
});

/// Store Test

import create from "zustand";

const useStore = create((set) => ({
  movies: [],
  error: "",
  addMovie: (movie) =>
    set((state) => ({
      ...state,
      movies: [...state.movies, { ...movie }],
    })),
  removeMovie: (id) =>
    set((state) => ({
      ...state,
      movies: state.movies.filter((mov) => mov.id !== id),
    })),
}));

test("movieToStore and then remove", () => {
  expect(
    movieToStoreHandler(useStore.getState(), mockedMovieData.id, null)
  ).toBe(false);
  movieToStoreHandler(useStore.getState(), mockedMovieData.id, mockedMovieData);
  expect(useStore.getState().movies).toHaveLength(1);
  movieToStoreHandler(useStore.getState(), mockedMovieData.id, mockedMovieData);
  expect(useStore.getState().movies).toHaveLength(0);
});
