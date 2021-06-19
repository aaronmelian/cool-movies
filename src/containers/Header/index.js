import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={{
          pathname: "/",
        }}
      >
        <h1 className="HeaderTitle" style={{ textDecoration: "none" }}>
          Cool Movies
        </h1>
      </Link>
    </div>
  );
};

export default Header;
