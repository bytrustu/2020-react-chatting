import React from 'react';
import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Header from '../SidePanel/Header';

const MainPanel = () => {
  return (<>
    <Header/>
    <section className="main-container">

      <MessageHeader/>
      <MessageForm/>
    </section>

    </>
  );
};

export default MainPanel;
