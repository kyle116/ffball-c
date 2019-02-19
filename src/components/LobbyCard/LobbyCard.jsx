import React from 'react';

import './LobbyCard.css';

const LobbyCard = (props) => {
  return (
    <div className="lobbyCard">
      <div className="lobbyTitle">Lobby: {props.lobby.name}</div>
      <button onClick={() => props.deleteLobby(props.lobby._id)}>Delete</button>
    </div>
  )
}

export default LobbyCard;
