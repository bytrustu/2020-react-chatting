import React from 'react';
import MenuLoading from '../Loading/MenuLoading';

const MessageHeader = ({ currentChatRoom }) => {
  return (

    <div className="row subject-container">
      <div className="subject-content">
        {currentChatRoom ?
          (
            <>
              <span style={{ fontSize: '4rem' }}>⌨️</span>
              <span className="subject-title">{currentChatRoom.name}</span>
            </>
          )
          :
          <MenuLoading />
        }
      </div>
    </div>
  );
};

export default MessageHeader;
