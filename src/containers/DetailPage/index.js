import React, { useEffect, useState } from "react";
import "./DetailPage.scss";
import { authAxios } from "../../helpers/axios";

import {
  frecuentUrls,
  formatDateToEurope,
  fontClassGetterByIndex,
} from "../../utils/commonUtils";

import { useParams, useLocation } from "react-router-dom";

const DetailPage = () => {
  const { id, categoryId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [showWaitingPage, setShowWaitingPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Get movie data.
    authAxios
      .get(`movie/${id}`)
      .then((resp) => {
        console.log(resp.data);
        setMovieDetails(resp.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, []);

  return (
    <div className={`DetailPage ${fontClassGetterByIndex(categoryId)}`}>
      {movieDetails && (
        <>
          <h2 className="MovieTitle">{movieDetails.title}</h2>
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
              <button className="wishListButton">Add to Watchlist</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
