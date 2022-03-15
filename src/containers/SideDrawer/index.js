import React, { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "../../components/BackDrop";
import "./SideDrawer.scss";
import Icon from "../../components/Icon";
import WatchListItem from "../../components/WatchListItem";

const SideDrawer = ({ movies, removeMovie }) => {
  const [visible, setVisible] = useState(false);

  let drawerClasses = "SideDrawer close";
  if (visible) {
    drawerClasses = "SideDrawer open";
  }

  return (
    <div className="SideDrawerContainer">
      <div title="MenuOpen">
        <Icon icon="Menu" clicked={() => setVisible(!visible)} />
      </div>
      <div className={drawerClasses} title="SideDrawer">
        <div className="ArrowContainer">
          <div title="MenuClose">
            <Icon icon="ArrowLeft" clicked={() => setVisible(!visible)} />
          </div>
        </div>
        <h3>Watch List</h3>
        <div className="FavoriteList">
          {movies.map((mov, i) => {
            return (
              <div
                title={`watchTest${i}`}
                key={mov.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <WatchListItem
                  clickedToClose={() => removeMovie(mov.id)}
                  WatchListItemClickedHandler={() => setVisible(false)}
                  movieData={mov}
                />
              </div>
            );
          })}
        </div>
      </div>
      {visible && (
        <div title="BackdropContainer">
          <Backdrop show={true} clickHandler={() => setVisible(!visible)} />
        </div>
      )}
    </div>
  );
};

SideDrawer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeMovie: PropTypes.func.isRequired,
};

export default SideDrawer;
