import React from 'react';

const ChatRooms = () => {
  return (
    <li className="sub-menu">
      <a href="javascript:void(0);">
        <span className="menu-icon">⌨️</span><span>채팅방 목록 (5)</span>
        <i className="fas fa-caret-down menu-arrow float-right"/>
      </a>
      <ul>
        <li>
          <a href="/notice_board" title="<span>공지사항</span>">
            <span>채팅방1</span>
          </a>
        </li>
      </ul>
    </li>

  );
};

export default ChatRooms;
