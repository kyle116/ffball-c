import React, { Component } from 'react';
import { node, number, bool, oneOf } from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
// import lobbyService from '../../services/lobbyService'

import './FlashMessage.css';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: this.props.isVisible };

    this.hide = this.hide.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentDidMount() {
    this.remaining = this.props.duration;
    this.resumeTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  hide() {
    this.setState({ isVisible: false });
    this.props.flashMessageToggle();
  }

  resumeTimer() {
    window.clearTimeout(this.timer);

    this.start = new Date();
    this.timer = setTimeout(this.hide, this.remaining);
  }

  pauseTimer() {
    if (this.props.persistOnHover) {
      clearTimeout(this.timer);

      this.remaining -= new Date() - this.start;
    }
  }

  render() {
    const { isVisible } = this.state;
    const { children } = this.props;

    return isVisible ? (
      <div onMouseEnter={this.pauseTimer} onMouseLeave={this.resumeTimer}>
        {children}
      </div>
    ) : null;
  }
}

FlashMessage.defaultProps = {
  children: null,
  duration: 5000,
  persistOnHover: true,
  isVisible: true,
  type: 'error'
};

FlashMessage.propTypes = {
  children: node,
  duration: number,
  persistOnHover: bool,
  isVisible: bool,
  type: oneOf(['error', 'success'])
};

export default FlashMessage;
