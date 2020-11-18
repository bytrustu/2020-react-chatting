import React, { useEffect, useRef, useState } from 'react';
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import DirectMessages from './DirectMessages';
import ChatRooms from './ChatRooms';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../firebase';
import { changeCurrentChatRoom } from '../../../redux/actions/chat_action';

const SidePanel = () => {

  const dispatch = useDispatch();
  const { chatRoomRef, currentChatRoom } = useSelector(state => state.chat);
  const [room, setRoom] = useState([]);

  if (!currentChatRoom && room.length !== 0) {
    dispatch(changeCurrentChatRoom(room[0]));
  }

  useEffect(() => {
    const fetchData = async () => {
      chatRoomRef.on('value', snapshot => {
        setRoom([]);
        setRoom(snapshotToArray(snapshot));
      });
    };
    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    if (snapshot?.val() === null) return [];
    return Object.values(snapshot.val());
  }


  return (
    <aside className="sidebar">
      <Logo />
      <UserPanel />
      <div className="menu-container">
        <ul className="menu-content">
          <Favorited />
          <ChatRooms room={room} />
          <DirectMessages />
        </ul>
      </div>
    </aside>

  );
};

export default SidePanel;
