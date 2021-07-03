import create from "zustand";

const useStore = create((set) => ({
  movies: [
    {
      adult: false,
      backdrop_path:
        "https://image.tmdb.org/t/p/w500/70AV2Xx5FQYj20labp0EGdbjI6E.jpg",
      belongs_to_collection: null,
      budget: 40000000,
      homepage: "https://www.miramax.com/movie/wrath-of-man",
      id: 637649,
      imdb_id: "tt11083552",
      poster_path: "/M7SUK85sKjaStg4TKhlAVyGlz3.jpg",
      genres: [
        { id: 80, name: "Crime" },
        { id: 28, name: "Action" },
      ],
    },
  ],
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
