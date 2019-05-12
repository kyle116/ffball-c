import React, { Component } from 'react';
import io from 'socket.io-client';
// Services
import lobbyService from '../../services/lobbyService';
// Components
import LobbyCard from '../../components/LobbyCard/LobbyCard';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
// Stylesheets
import './LobbiesPage.css';

class LobbiesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser ? this.props.currentUser : null,
			lobbies: [],
			recentlyDeleted: null,
			lobbyName: '',
			flashMessage: { display: false, message: '' },
			testSocket: ''
		}
	    this.getLobbies = this.getLobbies.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.validateLobby = this.validateLobby.bind(this);
	    this.createLobby = this.createLobby.bind(this);
	    this.deleteLobby = this.deleteLobby.bind(this);
	    this.flashMessageToggle = this.flashMessageToggle.bind(this);

	    // this.socket = io('localhost:3001');
	    this.testSocket = this.testSocket.bind(this);
	    // console.log('this.socket', this.socket)
	    const addMessage = data => {
            console.log(data);
            this.setState({testSocket: [...this.state.testSocket, data]});
            console.log(this.state.testSocket);
        };

	 //    this.socket.on('RECEIVE_MESSAGE', function(data){
		//     addMessage(data);
		// });
	}
	componentDidMount() {
		this.getLobbies();
		this.socket = io('localhost:3001');
		// io.on('connection', function(socket){
		// 	console.log('IO Connected', socket);
		// });

		// this.socket.sockets.on('connection', function (client) {
		// 	client.send("hello")
		// 	console.log("hello", client)
		// })
		console.log('sockets', this.socket)

		this.socket.on('connection', function (socket) {
			console.log('Socket Connected', socket);
			socket.on('connection', function () {
				console.log('Socket Connected', socket);
			});
			socket.on('disconnect', function () { });
		});

		this.socket.on('RECEIVE_MESSAGE', function(data){
		    // addMessage(data);
		});
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}


	getLobbies() {
		lobbyService.getLobbies().then(lobbies => {
		  this.setState({
		    lobbies: lobbies
		  });
		});
	}

	onChange(e) {
		this.setState({
		  lobbyName: e.target.value
		});
	}

	validateLobby() {
		const lobbyName = this.state.lobbyName;
		if(lobbyName === '') {
		  this.flashMessageToggle('Lobby name cannot be blank');
		  return false;
		}
		var lobbies = this.state.lobbies;
		for (var i = 0; i < lobbies.length; i++) {
		  if(lobbies[i].name === lobbyName) {
		    this.flashMessageToggle('Duplicate lobby name, lobby names must be unique');
		    return false;
		  }
		}
		return true;
	}

	createLobby(e) {
	    e.preventDefault();
	    const lobbyName = this.state.lobbyName;
	    if(!this.validateLobby()) return;

	    lobbyService.createLobby(lobbyName).then(lobby => {
	      var newLobbies = this.state.lobbies.concat(lobby);
	      this.setState({
	        lobbies: newLobbies,
	        lobbyName: '' // clears inputs after submit
	      });
	    })
	    .catch(error => console.log(error.response));
	}

	deleteLobby(lobbyId) {
		lobbyService.deleteLobby(lobbyId).then(recentlyDeleted => {
		  var updatedLobbies = this.state.lobbies;
		  for (var i = 0; i < updatedLobbies.length; i++) {
		    if(updatedLobbies[i]._id === lobbyId) {
		      updatedLobbies.splice(i, 1);
		    }
		  }
		  this.setState({
		    lobbies: updatedLobbies,
		    recentlyDeleted: recentlyDeleted
		  });
		});
	}

	flashMessageToggle(message = '') {
		var flashMessage = {...this.state.flashMessage};
		flashMessage.display = !flashMessage.display;
		flashMessage.message = message;
		this.setState({flashMessage});
		if(message) console.error(message);
	}

	testSocket(e) {
		e.preventDefault();
		console.log('socket test', {
	        author: this.state.currentUser.firstName,
	        message: 'hello'
	    })
	    this.socket.emit('TEST_SOCKET', {
	        author: this.state.currentUser.firstName,
	        message: 'hello'
	    });
	    this.setState({testSocket: ''});
	}

	render() {
		return (
			<div>
			{this.state.flashMessage.display &&
			<FlashMessage duration={3000} persistOnHover={true} flashMessageToggle={this.flashMessageToggle} type="error">
			  <strong>{this.state.flashMessage.message}</strong>
			</FlashMessage>
			}
			<LogoutButton {...this.props}></LogoutButton>
	        <form onSubmit={this.createLobby}>
	          <label>
	            Lobby Name:&nbsp;
	            <input
	              placeholder="Enter a Name"
	              name="lobbyName"
	              ref="lobbyName"
	              value={this.state.lobbyName}
	              onChange={this.onChange}
	            />
	          </label>
	          <button>Create Lobby</button>
	        </form>
	        <button onClick={this.testSocket}>Test Socket</button>
	        {this.state.lobbies.length > 0 ?
	          this.state.lobbies.map((lobby, index) =>
	            <LobbyCard key={lobby._id} lobby={lobby} deleteLobby={this.deleteLobby}></LobbyCard>
	          )
	          :
	          <div>No Lobbies Found</div>
	        }
			</div>
		);
	}
}

export default LobbiesPage;
