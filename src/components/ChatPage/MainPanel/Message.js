import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

const Message = ({ chats, typings }) => {
  const { currentUser } = useSelector(state => state.user);
  const messagesRef = useRef(null);
  const timeFromNow = timestamp => moment(timestamp).fromNow();
  const isImage = message => message.hasOwnProperty('image')
    && !message.hasOwnProperty('content');

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [chats]);

  return (
    <div className="chat-warp m-scrollbar force-overflow" ref={messagesRef}>
      {
        typings.length !== 0
        && <p className="typing">{typings.join(', ')}님이 채팅을 작성중 입니다.</p>
      }
      <ul className="chat-message">
        {
          chats.length !== 0 && (
            chats.map(message =>
              message.user.id === currentUser.uid ? (
                  <li className="chat-content chat-right animated fadeIn fast">
                    <div className="c-meesage-first right">
                      <p className="c-message-info">
                        <span className="head-date">{timeFromNow(message.timestamp)}</span>
                      </p>
                      <div className="c-meesage-content c-right-first">
                        {
                          isImage(message) ?
                            <img style={{ maxWidth: '300px' }} alt="이미지" src={message.image} />
                            :
                            <span>{message.content}</span>
                        }
                      </div>
                    </div>
                  </li>
                )
                :
                (
                  <li className="chat-content chat-left animated fadeIn fast">
                    <img src={message.user.image} className="chat-image" alt="프로필이미지" />
                    <div className="c-meesage-first left">
                      <p className="c-message-info">
                        <span className="head-nick">{message.user.name}</span>
                        <span className="head-date">2020-10-10</span>
                      </p>
                      <div className="c-meesage-content c-left-first">
                        <span>{message.content}</span>
                      </div>
                    </div>
                  </li>
                ),
            )
          )
        }
      </ul>
    </div>
  );
};

export default Message;
