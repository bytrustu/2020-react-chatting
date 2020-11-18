import React, { useRef, useState } from 'react';
import firebase from '../../../firebase';
import MakeRoomModal from '../Modal/MakeRoomModal';

const Header = ({ setSerachText }) => {

  const onLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      alert('에러 발생!');
    }
  };

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
  const onChangeSearchText = (e) => {
    setSerachText(e.target.value);
  }

  return (
    <>
      <div className="header">
        <div className="task-container">
          <span className="btn-header" onClick={handleShow} title="채팅방 개설">🙏</span>
          <span className="btn-header ml-2" onClick={onLogout} title="로그아웃">🔴</span>
          <div className="search-group">
            <input id="search-fld" className="ml-1" type="text" placeholder="메세지 검색" onChange={onChangeSearchText}/>
            <button type="button" id="search-header" className="align-middle">🔍</button>
          </div>
        </div>
      </div>
      <MakeRoomModal show={show} setShow={setShow}/>
    </>
  );
};

export default Header;
