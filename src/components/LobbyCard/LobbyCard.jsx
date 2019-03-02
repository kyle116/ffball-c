import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Stylesheets
import './LobbyCard.css';

const LobbyCard = (props) => {
	return (
		<div className="lobbyCard">
			<Link to={`/lobby/${props.lobby._id}`}>
				<div className="lobbyTitle">Lobby: {props.lobby.name}</div>
			</Link>
			<button onClick={() => props.deleteLobby(props.lobby._id)}>Delete</button>
		</div>
	)
}

export default LobbyCard;
