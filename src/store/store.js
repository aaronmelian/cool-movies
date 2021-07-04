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
  resetMovies: () =>
    set((state) => ({
      ...state,
      movies: [],
    })),
  setError: (error) =>
    set((state) => ({
      ...state,
      error: error,
    })),
  removeError: () =>
    set((state) => ({
      ...state,
      error: "",
    })),
}));

export default useStore;
