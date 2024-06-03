// src/components/Modal.js
import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';
import PostComments from './posts/Comments';

const Modal = ({ isOpen, onRequestClose, postId }) => {
  const appElement = document.getElementById('root');
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
      appElement={appElement}
    >
      <button className="close-button" onClick={onRequestClose}>X</button>
      <PostComments postId={postId} />
    </ReactModal>
  );
};

export default Modal;
