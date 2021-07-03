import React from "react";
import PropTypes from "prop-types";
import "./ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = ({ error, removeError }) => {
  return (
    <div className="ErrorPage">
      <p className="ErrorMessage">{error}</p>

      <div className="ErrorButtonContainer">
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <button
            onClick={() => removeError()}
            className="ErrorButton HoverRed"
          >
            Go back to Cool Movies
          </button>
        </Link>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
  removeError: PropTypes.func.isRequired,
};

export default ErrorPage;
