import React from 'react';

const CurrentUserContext = React.createContext();

class CurrentUserProvider extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      isAuth: this.props.value.currentUser ? true : false,
	      message: '',
	      currentUser: this.props.value.currentUser
	    };
	}

	render() {
		return (
		  <CurrentUserContext.Provider
		    value={{
				isAuth: this.state.isAuth,
				message: this.state.message,
				currentUser: this.state.currentUser
			}}
		  >
		    {this.props.children}
		  </CurrentUserContext.Provider>
		)
	}
}

const CurrentUserConsumer = CurrentUserContext.Consumer;
export { CurrentUserProvider, CurrentUserConsumer };

// export default CurrentUserContext;