import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import MenuLoading from '../Loading/MenuLoading';
import { changeCurrentChatRoom } from '../../../redux/actions/chat_action';

const ChatRooms = ({ room }) => {
  const dispatch = useDispatch();
  const hanleChangeCurrentChatRoom = (id) => {
    dispatch(changeCurrentChatRoom(id));
  }

  return (
    <li className="sub-menu">
      <a href="javascript:void(0);">
        <span className="menu-icon">⌨️</span><span>채팅방 목록 ({room.length})</span>
        <i className="fas fa-caret-down menu-arrow float-right" />
      </a>
      <ul>
        {room.length === 0 ? <MenuLoading /> : room.map(element => <li>
          <a href="#" title={element.name} key={element.id} onClick={() => hanleChangeCurrentChatRoom(element)}>
            <span># {element.name}</span>
          </a>
        </li>)}
      </ul>
    </li>

  );
};

export default ChatRooms;
