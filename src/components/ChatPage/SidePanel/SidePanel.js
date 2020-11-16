import React from 'react';
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import DirectMessages from './DirectMessages';
import ChatRooms from './ChatRooms';
import Logo from '../MainPanel/Logo';

const SidePanel = () => {
  return (
    <aside className="sidebar">
      <Logo/>
      <UserPanel/>
      <div className="menu-container">
        <ul className="menu-content">
          <Favorited/>
          <ChatRooms/>
          <DirectMessages/>
        </ul>
      </div>
    </aside>

  );
};

export default SidePanel;
