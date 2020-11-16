import React from 'react';

const MessageHeader = () => {
  return (
    <div className="row subject-container">
      <div className="subject-content">
        <span style={{fontSize: '4rem'}}>⌨️</span>
        <span className="subject-title">채팅방1</span>
      </div>
    </div>
  );
};

export default MessageHeader;
