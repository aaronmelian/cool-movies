import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Carousel.scss";

const Carousel = ({ children, categoryName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="Carousel" title="Carousel">
      {categoryName ? (
        <h2 title={"CategoryTitle"} className="CategoryTitle">
          {categoryName}
        </h2>
      ) : null}
      <div
        title="inner"
        className="Inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="Indicators">
        <button
          className="CarButton"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`CarButton ${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          className="CarButton"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  categoryName: PropTypes.string.isRequired,
};

Carousel.defaultProps = {
  categoryName: "Movie List",
};

export default Carousel;
