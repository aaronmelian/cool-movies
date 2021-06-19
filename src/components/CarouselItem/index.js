import React from "react";
import { Link } from "react-router-dom";
import "./CarouselItem.scss";
import { frecuentUrls } from "../../utils/commonUtils";

const CarouselItem = ({ width, title, imageUrl, id, categoryId }) => {
  return (
    <div className="CarouselItem" style={{ width: width }}>
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

export default CarouselItem;
