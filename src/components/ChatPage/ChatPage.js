import React from 'react';
import MainPanel from './MainPanel/MainPanel';
import SidePanel from './SidePanel/SidePanel';

const ChatPage = () => {

  return (
    <div style={{ display: 'flex', height: '100vh', minHeight: '942px' }}>
      <SidePanel />
      <div style={{ width: '100%' }}>
        <MainPanel />
      </div>
    </div>
  );
};

export default ChatPage;
