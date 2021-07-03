import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const Backdrop = ({ show, clickHandler }) => {
  return show ? (
    <div className="Backdrop" data-testid="backdrop" onClick={clickHandler} />
  ) : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func,
};

Backdrop.defaultProps = {
  clickHandler: () => {},
};

export default Backdrop;
