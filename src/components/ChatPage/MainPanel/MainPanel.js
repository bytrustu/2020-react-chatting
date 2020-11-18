import React, { useState } from 'react';
import MessageHeader from './MessageHeader';
import Header from './Header';
import { useSelector } from 'react-redux';
import MessageContainer from './MessageContainer';

const MainPanel = () => {

  const { currentChatRoom, messagesRef } = useSelector(state => state.chat);
  const [searchText, setSerachText] = useState('');

  return (<>
      <Header setSerachText={setSerachText}/>
      <section className="main-container">
        <MessageHeader currentChatRoom={currentChatRoom}/>
        <MessageContainer currentChatRoom={currentChatRoom} messagesRef={messagesRef} searchText={searchText}/>
      </section>

    </>
  );
};

export default MainPanel;
