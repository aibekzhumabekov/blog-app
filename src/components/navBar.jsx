import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand">
        MERN Blog App
      </Link>
    
    </nav>
  );
};

export default NavBar;
