import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SideDrawer from "../SideDrawer";
import "./Header.scss";

const Header = ({ removeError, movies, removeMovie }) => {
  return (
    <div className="Header">
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={{
          pathname: "/",
        }}
      >
        <h1
          onClick={() => removeError()}
          className="HeaderTitle"
          style={{ textDecoration: "none" }}
        >
          Cool Movies
        </h1>
      </Link>
      <SideDrawer movies={movies} removeMovie={removeMovie} />
    </div>
  );
};

Header.propTypes = {
  removeError: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeMovie: PropTypes.func.isRequired,
};

export default Header;
