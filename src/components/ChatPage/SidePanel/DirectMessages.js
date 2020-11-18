import React from 'react';
import MenuLoading from '../Loading/MenuLoading';

const DirectMessages = ({ users = [], hanleChangeCurrentChatRoom, currentUser }) => {
  const getChatRoomId = userId => {
    const currentUserId = currentUser.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  const createChatData = (user) => {
    const chatRoomId = getChatRoomId(user.key);
    const chatRoomData = {
      createBy: {
        image: currentUser.photoURL,
        name: currentUser.displayName,
      },
      description: `${user.name}님과의 개인 메세지 공간 입니다.`,
      id: chatRoomId,
      name: user.name,
      key: chatRoomId,
      private: true,
    };
    return chatRoomData;
  };

  const handleChangePrivateChatRoom = (user) => {
    hanleChangeCurrentChatRoom(createChatData(user));
  };

  return (
    <li className="sub-menu">
      <a href="javascript:void(0);">
        <span className="menu-icon">🔥</span><span>개인 메세지 ({users.length})</span>
      </a>
      <ul>
        {users.length === 0 ?
          <MenuLoading />
          :
          users.map(user => (
          <li key={user.key}>
            <a
              href="javascript:void(0)"
              title={user.name}
              key={user.key}
              onClick={() => handleChangePrivateChatRoom(user)}>
              <span># {user.name} {user.status === 'offline' ? '🔴' : '🟢'}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default DirectMessages;
