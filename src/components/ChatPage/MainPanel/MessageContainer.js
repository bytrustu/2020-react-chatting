import React, { useEffect, useRef, useState } from 'react';
import { BsTextarea } from 'react-icons/all';
import { Button, Form } from 'react-bootstrap';
import ProgressBar from '../Loading/Progress';
import Message from './Message';
import firebase from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime-types';
import { v4 as uuid } from 'uuid';
import MessageForm from './MessageForm';
import MenuLoading from '../Loading/MenuLoading';

const MessageContainer = ({ currentChatRoom, messagesRef, searchText }) => {

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const inputRef = useRef();
  const fileRef = useRef();

  const { currentUser } = useSelector(state => state.user);

  const handleOnChange = (e) => {
    setContent(e.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        image: currentUser.photoURL,
      },
    };

    if (fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = content;
    }

    return message;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return alert('채팅을 작성해주세요.');
    }
    setLoading(true);
    try {
      await messagesRef.child(currentChatRoom.id).push().set(createMessage());
    } catch (e) {
      alert('오류가 발생 했습니다.');
    } finally {
      setLoading(false);
      setContent('');
      inputRef.current.focus();
    }
  };

  const handleOpenImageUpload = () => {
    fileRef.current.click();
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      setLoading(true);

      const fileName = `${uuid()}-${file.name}`;
      const folder = currentChatRoom.private ? 'private' : 'public';
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`message/${folder}/${fileName}`)
        .put(file, metadata);

      uploadTask.on('state_change',
        uploadTaskSnapshot => {
          const percentage = Math.round(
            (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100,
          );
          setPercent(percentage);
          if (percentage === 100) {
            setPercent(0);
          }
        },
        error => {
          alert('에러가 발생했습니다.');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              messagesRef
                .child(currentChatRoom.id)
                .push()
                .set(createMessage(downloadURL));
            });
        });

    } catch (e) {
      alert('이미지 업로드 실패!');
    } finally {
      setLoading(false);
    }

  };


  const [chats, setChats] = useState([]);
  const [searchChats, setSearchChats] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      messagesRef.child(currentChatRoom.id).on('value', resp => {
        setChats([]);
        const chatData = snapshotToArray(resp);
        setChats(chatData);
      });
    };
    if (currentChatRoom?.id) {
      fetchData();
      setContent('');
      inputRef.current.focus();
    }
  }, [currentChatRoom?.id]);

  useEffect(() => {
    if (searchText.trim()) {
      const searchChatData = chats
        .filter(element =>
          new RegExp(searchText, 'gi')
            .test(element.content));
      setSearchChats([]);
      setSearchChats(searchChatData);
    }
  }, [searchText]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };


  return (
    <>
      {
        (percent > 0 && percent < 100) && <ProgressBar now={percent} />
      }
      <article className="main-content mt-3">
        <div className="row" style={{ height: '80%' }}>
          <div className="col-12">
            <div className="summary-container position-relative border-gray">
              {
                chats.length === 0 ?
                  <MenuLoading />
                  :
                  <Message chats={searchText ? searchChats : chats} />
              }
            </div>
          </div>
        </div>
        <div className="row" style={{ height: '20%' }}>
          <div className="col-12">
            <div className="border-gray w-auto" style={{
              height: '100%',
              border: '1px solid #ececec',
            }}>
              <MessageForm
                handleSubmit={handleSubmit}
                content={content}
                handleOnChange={handleOnChange}
                inputRef={inputRef}
                loading={loading}
                handleOpenImageUpload={handleOpenImageUpload}
                handleUploadImage={handleUploadImage}
                fileRef={fileRef}
              />
            </div>
          </div>
        </div>
      </article>
    </>

  );
};

export default MessageContainer;
