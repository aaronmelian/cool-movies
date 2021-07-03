import React from "react";
import { Link } from "react-router-dom";
import "./CarouselItem.scss";
import { frecuentUrls } from "../../utils/commonUtils";
import PropTypes from "prop-types";

const CarouselItem = ({ title, imageUrl, id, categoryId }) => {
  return (
    <div className="CarouselItem">
      <Link
        className="CarouselBox"
        to={{
          pathname: `/movie/${id}/${categoryId}`,
        }}
      >
        <h3>{title}</h3>
        <img src={`${frecuentUrls.baseImgUrls}${imageUrl}`} alt={title} />
      </Link>
    </div>
  );
};

CarouselItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default CarouselItem;
