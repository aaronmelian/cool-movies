import React from "react";
import { Link } from "react-router-dom";
import { frecuentUrls } from "../../utils/commonUtils";
import "./WatchListItem.scss";
import Icon from "../../components/Icon";
import IconBox from "../../components/IconBox";
import PropTypes from "prop-types";

const WatchListItem = ({
  movieData,
  clickedToClose,
  WatchListItemClickedHandler,
}) => {
  return (
    <div className="WatchListItem">
      <Link
        title={`Link-${movieData.title}`}
        onClick={() => WatchListItemClickedHandler()}
        to={{
          pathname: `/movie/${movieData.id}/${movieData.genres[0].id}`,
        }}
      >
        <img
          alt={movieData.title}
          className="WatchListItemImg"
          src={`${frecuentUrls.baseImgUrls}${movieData.poster_path}`}
        />
      </Link>
      <div
        className="WatchListItemClose"
        title={`ItemRemove-${movieData.title}`}
        onClick={clickedToClose}
      >
        <IconBox>
          <Icon icon="Close" />
        </IconBox>
      </div>
    </div>
  );
};

WatchListItem.propTypes = {
  movieData: PropTypes.object.isRequired,
  clickedToClose: PropTypes.func.isRequired,
};

export default WatchListItem;
