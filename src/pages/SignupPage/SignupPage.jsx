import React, { Component } from 'react';
// Stylesheets
import './SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
		super(props);
    this.state = {
      modal: this.props.modal
    }
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <label>SignupPage</label>
        <input placeholder="Look here text" />
      </div>
    )
  }
}

SignupPage.defaultProps = {
  modal: false
};

export default SignupPage;
