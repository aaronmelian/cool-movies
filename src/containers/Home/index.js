import "./home.scss";
import React, { useState, useEffect } from "react";
import { authAxios } from "../../helpers/axios";

import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";

const Home = () => {
  const [categories, setCategories] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Get all categories.
    authAxios
      .get("/genre/movie/list")
      .then((resp) => {
        setCategories(resp.data.genres.slice(0, 3)); // We could filter wich categories to pick if  later needed.
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, []);

  useEffect(() => {
    // Get data from each category.
    if (categories) {
      const promises = categories.map((catg, i) => {
        return authAxios
          .get(
            `/discover/movie?&language=en-US&sort_by=popularity.desc&page=1&with_genres=${catg.id}`
          )
          .then((res) => {
            return {
              ...categories[i],
              movieList: res.data.results.slice(0, 6),
            };
          });
      });
      Promise.all(promises).then((data) => {
        setMovieList(data);
      });
    }
  }, [categories]);

  useEffect(() => {
    if (movieList) {
      setLoading(false);
    }
  }, [movieList]);

  return (
    <div className="Home">
      {!loading &&
        movieList.map((catg, i) => {
          return (
            <Carousel key={`catg.name-${i}`} categoryName={catg.name}>
              {catg.movieList.map((movie) => {
                return (
                  <CarouselItem
                    categoryId={catg.id}
                    id={movie.id}
                    key={`${catg.name}-${movie.title}`}
                    title={movie.title}
                    imageUrl={movie.backdrop_path}
                    overview={movie.overview}
                  />
                );
              })}
            </Carousel>
          );
        })}
    </div>
  );
};

export default Home;
