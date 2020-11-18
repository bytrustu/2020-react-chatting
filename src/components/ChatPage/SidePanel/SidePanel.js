import React, { useEffect, useRef, useState } from 'react';
import UserPanel from './UserPanel';
import Favorited from './Favorited';
import DirectMessages from './DirectMessages';
import ChatRooms from './ChatRooms';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChatRoom } from '../../../redux/actions/chat_action';

const SidePanel = () => {

  const dispatch = useDispatch();
  const { chatRoomRef, currentChatRoom } = useSelector(state => state.chat);
  const { usersRef, currentUser } = useSelector(state => state.user);
  const [room, setRoom] = useState([]);
  const [users, setUsers] = useState([]);

  if (!currentChatRoom && room.length !== 0) {
    room[0] = { ...room[0], private: false };
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

  useEffect(() => {
    const fetchData = async () => {
      usersRef.on('value', snapshot => {
        setUsers([]);
        setUsers(snapshotToArray(snapshot)
          .filter(user => user.key !== currentUser.uid)
          .map(user => ({ ...user, status: 'offline' }))
          .sort((a, b) => a.status === 'online' ? -1 : 1),
        );
      });
    };
    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    if (snapshot?.val() === null) return [];
    return Object.entries(snapshot.val()).map(([k, v]) => ({ ...v, key: k }));
  };

  const hanleChangeCurrentChatRoom = (id) => {
    dispatch(changeCurrentChatRoom(id));
  };

  return (
    <aside className="sidebar">
      <Logo />
      <UserPanel />
      <div className="menu-container">
        <ul className="menu-content">
          <Favorited hanleChangeCurrentChatRoom={hanleChangeCurrentChatRoom}/>
          <ChatRooms room={room} hanleChangeCurrentChatRoom={hanleChangeCurrentChatRoom} />
          <DirectMessages users={users} hanleChangeCurrentChatRoom={hanleChangeCurrentChatRoom}
                          currentUser={currentUser} />
        </ul>
      </div>
    </aside>

  );
};

export default SidePanel;
