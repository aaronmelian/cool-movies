import React, { useEffect, useState } from "react";
import "./DetailPage.scss";
import { authAxios } from "../../helpers/axios";
import Backdrop from "../../components/BackDrop/Backdrop";
import { Link } from "react-router-dom";

import {
  frecuentUrls,
  formatDateToEurope,
  fontClassGetterByIndex,
} from "../../utils/commonUtils";
import useStore from "../../store/store";

import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id, categoryId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [isOnWishList, setIsOnWishList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const addMovie = useStore((state) => state.addMovie);
  const removeMovie = useStore((state) => state.removeMovie);

  const movies = useStore((state) => state.movies);

  const MovieToWishListToggleHandler = () => {
    if (movies && movies.find((mov) => mov.id == id)) {
      setIsOnWishList(false);
      removeMovie(parseInt(id));
    } else {
      setIsOnWishList(true);
      addMovie(movieDetails);
    }
  };

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  useEffect(() => {
    // Get movie data.
    authAxios
      .get(`movie/${id}`)
      .then((resp) => {
        setMovieDetails(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, []);

  return (
    <div
      className={`DetailPage ${fontClassGetterByIndex(categoryId)}`}
      style={{
        backgroundImage: movieDetails
          ? `url(${frecuentUrls.baseImgUrls}${movieDetails.backdrop_path})`
          : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Backdrop />
      {!loading && (
        <div className="MovieZCapsule">
          <div className="titleAndX">
            <h2 className="MovieTitle">{movieDetails.title}</h2>
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={{
                pathname: "/",
              }}
            >
              <span className="CloseX">X</span>
            </Link>
          </div>
          <div className="MovieContainer">
            <img
              className="MovieImage"
              src={`${frecuentUrls.baseImgUrls}${movieDetails.poster_path}`}
            />
            <div className="MovieDetails">
              <h4 className="MovieTagline">{movieDetails.tagline}</h4>

              <div className="MovieMicroDetails">
                <span>{`Duration: ${movieDetails.runtime}m`}</span>
                <span>{`Date: ${formatDateToEurope(
                  movieDetails.release_date
                )}`}</span>
                <span>{`Rating:  ${movieDetails.vote_average}/10`}</span>
              </div>
              <p>{movieDetails.overview}</p>
              <button
                onClick={() => MovieToWishListToggleHandler()}
                className="wishListButton"
              >
                {!isOnWishList ? "Add to Watchlist" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
