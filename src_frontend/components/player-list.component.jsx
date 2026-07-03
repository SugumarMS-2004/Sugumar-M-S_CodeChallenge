import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayerService from "../services/player.service";

const PlayerListComponent = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    PlayerService.getAll()
      .then((res) => setPlayers(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <div>
        <h4>Players List</h4>
        <ul>
          {players.map((player, index) => (
            <li
              key={player.playerId || index}
              style={{ cursor: "pointer", fontWeight: index === currentIndex ? "bold" : "normal" }}
              onClick={() => {
                setCurrentPlayer(player);
                setCurrentIndex(index);
              }}
            >
              {player.playerName}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {currentPlayer ? (
          <div>
            <h4>Player Details</h4>
            <div><label><strong>Name:</strong></label> {currentPlayer.playerName}</div>
            <div><label><strong>Jersey:</strong></label> #{currentPlayer.jerseyNumber}</div>
            <div><label><strong>Role:</strong></label> {currentPlayer.role}</div>
            <div><label><strong>Matches:</strong></label> {currentPlayer.totalMatches}</div>
            <div><label><strong>Team:</strong></label> {currentPlayer.teamName}</div>
            <div><label><strong>Country:</strong></label> {currentPlayer.countryName}</div>
            <div><label><strong>Bio:</strong></label> {currentPlayer.description || "No biography."}</div>

        
            
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Player...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerListComponent;