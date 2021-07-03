import React from "react";
import PropTypes from "prop-types";
import "./IconBox.scss";

const IconBox = ({ children }) => (
  <div title="iconBox" className="IconBox HoverRed">
    {children}
  </div>
);

IconBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default IconBox;
