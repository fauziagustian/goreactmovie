import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link to={'/'}>Home</Link>
        </li>
        <li className="list-group-item"><Link to={'/Movies'}>Movies</Link></li>
        <li className="list-group-item"><Link to={'/Genres'}>Genres</Link></li>
        <li className="list-group-item"><Link to={'/Admin'}>Admin</Link></li>
        <li className="list-group-item"><Link to={'/Logout'}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
