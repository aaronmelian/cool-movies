import create from "zustand";

const useStore = create((set) => ({
  movies: [],
  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, { ...movie }],
    })),
  removeMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((mov) => mov.id !== id),
    })),
}));

export default useStore;
