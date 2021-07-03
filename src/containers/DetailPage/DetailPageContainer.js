import React, { useEffect, useState } from "react";
import "./DetailPage.scss";
import { authAxios } from "../../helpers/axios";

import useStore from "../../store/store";
import DetailPage from ".";
import { useParams } from "react-router-dom";
import {
  movieToStoreHandler,
  checkIfMovieIsOnList,
} from "../../utils/commonUtils";
import { ErrorTexts } from "../../utils/errorTexts";

const DetailPageContainer = () => {
  const { id, categoryId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [isOnWishList, setIsOnWishList] = useState(false);
  const [loading, setLoading] = useState(true);

  const setError = useStore((state) => state.setError);

  const state = useStore((state) => state);

  useEffect(() => {
    setIsOnWishList(checkIfMovieIsOnList(state.movies, id));
  }, [movieDetails, state, id]);

  useEffect(() => {
    // Get movie data.
    authAxios
      .get(`movie/${id}`)
      .then((resp) => {
        setMovieDetails(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setError(ErrorTexts.movieRetrieveErrror);
      });
  }, [id, setError]);

  return (
    <div title="detailPageContainer">
      {!loading ? (
        <DetailPage
          movieDetails={movieDetails}
          movieId={id}
          categoryId={categoryId}
          isOnWishList={isOnWishList}
          loading={loading}
          addOrRemove={() => movieToStoreHandler(state, id, movieDetails)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPageContainer;
