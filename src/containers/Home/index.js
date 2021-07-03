import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { authAxios } from "../../helpers/axios";

import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";
import useStore from "../../store/store";
import { ErrorTexts } from "../../utils/errorTexts";

const Home = ({ type, action }) => {
  const [categories, setCategories] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [loading, setLoading] = useState(true);

  const setError = useStore((state) => state.setError);

  useEffect(() => {
    // Get all categories.
    authAxios
      .get(`/genre/${type}/list`)
      .then((resp) => {
        setCategories(resp.data.genres.slice(0, 3)); // We could filter wich categories to pick if  later needed.
      })
      .catch((err) => {
        setError(ErrorTexts.categoryRetrieveErrror);
      });
  }, [setError, type]);

  useEffect(() => {
    // Get data from each category.
    if (categories) {
      const promises = categories.map((catg, i) => {
        return authAxios
          .get(
            `/${action}/${type}?&language=en-US&sort_by=popularity.desc&page=1&with_genres=${catg.id}`
          )
          .then((res) => {
            return {
              ...categories[i],
              movieList: res.data.results
                .filter((mov) => {
                  return mov.id && mov.backdrop_path;
                })
                .slice(0, 6),
            };
          });
      });
      Promise.all(promises)
        .then((data) => {
          setMovieList(data);
        })
        .catch((err) => {
          setError(ErrorTexts.moviesRetrieveErrror);
        });
    }
  }, [categories, setError, type, action]);

  useEffect(() => {
    if (movieList) {
      setLoading(false);
    }
  }, [movieList]);

  return (
    <div title="Home" className="Home">
      {!loading && (
        <div>
          <h3 title="HomeTitle">{`Browse lastest ${type}s!`}</h3>
          {movieList.map((catg, i) => {
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
                    />
                  );
                })}
              </Carousel>
            );
          })}
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  type: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};
Home.defaultProps = {
  action: "discover",
};

export default Home;
