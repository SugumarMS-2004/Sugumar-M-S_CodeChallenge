import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPlayerComponent from "./components/add-player.component";
import PlayerManagementComponent from "./components/player-management.component";
import PlayerListComponent from "./components/player-list.component";

const App = () => {
  return (
    <div>
      
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to="/players" className="navbar-brand">
          CricketAcademy
        </Link>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/players" className="nav-link">
              Players List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/manage" className="nav-link">
              Manage Actions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Register Player
            </Link>
          </li>
        </div>
      </nav>

      
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PlayerListComponent />} />
          <Route path="/players" element={<PlayerListComponent />} />
          <Route path="/manage" element={<PlayerManagementComponent />} />
          <Route path="/add" element={<AddPlayerComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
