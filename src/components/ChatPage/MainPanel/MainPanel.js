import React from 'react';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Header from './Header';
import { useSelector } from 'react-redux';

const MainPanel = () => {

  const {currentChatRoom} = useSelector(state => state.chat);

  return (<>
    <Header />
    <section className="main-container">
      <MessageHeader currentChatRoom={currentChatRoom} />
      <MessageForm/>
    </section>

    </>
  );
};

export default MainPanel;
