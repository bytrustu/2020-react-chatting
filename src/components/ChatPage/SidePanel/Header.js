import React, { useEffect } from 'react';
import firebase from '../../../firebase';
import { setUser } from '../../../redux/actions/user_action';

const Header = () => {
  const onLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      alert('에러 발생!')
    }
  }

  return (
    <div className="header">
      <div className="task-container">
        <span className="btn-header">🔖</span>
        <span className="btn-header ml-2" onClick={onLogout}>📌</span>
        <div className="search-group">
          <input id="search-fld" className="ml-1" type="text" placeholder="메세지 검색" />
          <button type="button" id="search-header" className="align-middle">🔍</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
