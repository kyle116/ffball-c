import React, { Component } from 'react';
// Stylesheets
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
  // const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const showHideClassName = show;

  return (
    <div className={showHideClassName ? "modal display-block" : "modal display-none"}>
      <div className="popup">
        <a className="close" href="#" onClick={handleClose}>&times;</a>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
