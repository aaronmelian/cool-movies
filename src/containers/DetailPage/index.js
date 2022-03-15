import React from "react";
import "./DetailPage.scss";
import Backdrop from "../../components/BackDrop/index";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import IconBox from "../../components/IconBox";
import {
  frecuentUrls,
  formatDateToEurope,
  fontClassGetterByIndex,
} from "../../utils/commonUtils";

const DetailPage = ({
  movieDetails,
  categoryId,
  isOnWishList,
  loading,
  addOrRemove,
}) => {
  return !loading && movieDetails ? (
    <div
      title="detailPage"
      className={`DetailPage ${fontClassGetterByIndex(categoryId)}`}
      style={{
        backgroundImage: `url(${frecuentUrls.baseImgUrls}${movieDetails.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Backdrop show={true} clickHandler={() => {}} />
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
              <div className="CloseX">
                <IconBox>
                  <Icon icon="Close" />
                </IconBox>
              </div>
            </Link>
          </div>
          <div className="MovieContainer">
            <img
              alt={movieDetails.title}
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
                title="wishListButton"
                onClick={() => addOrRemove()}
                className="WishListButton HoverRed"
              >
                {!isOnWishList ? "Add" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default DetailPage;
