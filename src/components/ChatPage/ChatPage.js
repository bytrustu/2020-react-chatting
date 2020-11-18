import React, { useEffect, useRef, useState } from 'react';
import MainPanel from './MainPanel/MainPanel';
import SidePanel from './SidePanel/SidePanel';
import MakeRoomModal from './Modal/MakeRoomModal';
import firebase from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addChatRoom, setChatRoomRef } from '../../redux/actions/chat_action';
import ProgressBar from './Loading/Progress';
import Progress from './Loading/Progress';

const ChatPage = () => {
  // const { chatRoomRef } = useSelector(state => state.chat);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const getChatList = async () => {
  //     const result = await chatRoomRef.once('value');
  //     return result.val();
  //   }
  //   getChatList().then(chatList => {
  //     dispatch(addChatRoom(chatList));
  //   })
  // }, []);


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidePanel />
      <div style={{ width: '100%' }}>
        <MainPanel />
      </div>
    </div>
  );
};

export default ChatPage;
