import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuLoading from '../Loading/MenuLoading';

const Favorited = ({ hanleChangeCurrentChatRoom }) => {

  const { usersRef, currentUser } = useSelector(state => state.user);
  const [favoriteChatRooms, setFavoriteChatRooms] = useState([]);

  const addListeners = () => {
    usersRef
      .child(`${currentUser.uid}`)
      .child('favorite')
      .on('value', dataSnapshot => {
        const result = snapshotToArray(dataSnapshot);
        setFavoriteChatRooms([]);
        setFavoriteChatRooms(result);
      });
  };

  const snapshotToArray = (snapshot) => {
    if (snapshot?.val() === null) return [];
    return Object.entries(snapshot.val()).map(([k, v]) => ({ ...v, key: k }));
  };

  const handleChangefavoriteChatRoom = (user) => {
    hanleChangeCurrentChatRoom(createChatData(user));
  };

  const createChatData = (favortie) => {
    const chatRoomData = {
      createBy: {
        image: currentUser.photoURL,
        name: currentUser.displayName,
      },
      description: favortie.description,
      id: favortie.key,
      name: favortie.name,
      key: favortie.key,
      private: false,
    };
    return chatRoomData;
  };

  useEffect(() => {
    addListeners();
  }, []);


  return (
    <li className="sub-menu">
      <a href="javascript:void(0);">
        <span className="menu-icon">🙏️</span><span>즐겨찾기 ({favoriteChatRooms.length})</span>
        <i className="fas fa-caret-down menu-arrow float-right" />
      </a>
      <ul>
        {
          favoriteChatRooms.length === 0 ?
            <MenuLoading />
            :
            favoriteChatRooms.map(favorite => (
              <li key={favorite.key}>
                <a href="javascript:void(0)"
                   title={favorite.name}
                   key={favorite.key}
                   onClick={() => handleChangefavoriteChatRoom(favorite)}
                >
                  <span># {favorite.name}</span>
                </a>
              </li>
            ))
        }
      </ul>
    </li>
  );
};

export default Favorited;
