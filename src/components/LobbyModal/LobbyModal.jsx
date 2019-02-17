import React from 'react';

import './LobbyModal.css';

const LobbyModal = (props) => {
  return (
    <div className="lobbyModal">
      <div className="lobbyTitle">Lobby: {props.lobby.name}</div>
      <button onClick={() => props.deleteLobby(props.lobby._id)}>Delete</button>
    </div>
  )
}

export default LobbyModal;
