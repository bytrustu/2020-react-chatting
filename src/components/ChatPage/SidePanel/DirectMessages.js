import React from 'react';

const DirectMessages = () => {
  return (
    <li className="sub-menu">
      <a href="javascript:void(0);">
        <span className="menu-icon">🔥</span><span>개인 메세지 (5)</span>
      </a>
      <ul>
        <li>
          <a href="/notice_board" title="<span>공지사항</span>">
            <span># 유저1</span>
          </a>
        </li>
      </ul>
    </li>
  );
};

export default DirectMessages;
