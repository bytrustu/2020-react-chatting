import React, { useState } from 'react';
import MenuLoading from '../Loading/MenuLoading';
import Favorite from './Favorite';

const MessageHeader = ({ currentChatRoom }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => setIsFavorite(!isFavorite);
  return (

    <div className="row subject-container">
      <div className="subject-content">
        {currentChatRoom ?
          (
            <>
              <span style={{ fontSize: '4rem' }}>⌨️</span>
              <span className="subject-title position-relative" >
                {currentChatRoom.name}
                {
                  !currentChatRoom.private
                  && <Favorite handleFavorite={handleFavorite} isFavorite={isFavorite}/>
                }

                <span className="font-weight-normal d-inline-block position-absolute"
                      style={{
                        marginTop: '4px',
                        color: '#6d6d6d',
                        left: '0',
                        top: '30px',
                        fontSize: '12px',
                        minWidth: '400px'
                      }}>
                🔖 <span className="d-inline-block ml-2">{currentChatRoom.description}</span>
              </span>
              </span>
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
