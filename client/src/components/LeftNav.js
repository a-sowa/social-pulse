import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icon-bis">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink
            to="/trending"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/rocket.svg" alt="trending" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/user.svg" alt="profil" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
