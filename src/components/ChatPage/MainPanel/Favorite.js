import React, { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Favorite = ({ handleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { usersRef, currentUser } = useSelector(state => state.user);
  const { currentChatRoom } = useSelector(state => state.chat);
  const handleChangeFavorite = () => {
    if (isFavorite) {
      usersRef
        .child(`${currentUser.uid}/favorite`)
        .child(currentChatRoom.key)
        .remove(err => {
          if (err !== null) {
            alert('에러 발생');
          }
        });
    } else {
      usersRef
        .child(`${currentUser.uid}/favorite`)
        .update({
          [currentChatRoom.id]: {
            name: currentChatRoom.name,
            description: currentChatRoom.description,
            createdBy: {
              name: currentChatRoom.createBy.name,
              image: currentChatRoom.createBy.image,
            },
          },
        });
    }
    setIsFavorite(prev => !prev);
  };

  const addFavortiedListener = (chatRoomId, userId) => {
    usersRef
      .child(userId)
      .child('favorite')
      .once('value')
      .then(data => {
        if (data.val() !== null) {
          const chatRoomIds = Object.keys(data.val());
          const isAlreadyFavorite = chatRoomIds.includes(chatRoomId);
          setIsFavorite(isAlreadyFavorite);
        }
      })
  }

  useEffect(() => {
    if (currentUser && currentChatRoom) {
      addFavortiedListener(currentChatRoom.key, currentUser.uid);
    }
  }, [currentChatRoom.key]);


  return isFavorite ?
    <BsHeartFill className="ml-2 text-danger" style={{ cursor: 'pointer' }} onClick={handleFavorite}
                 onClick={handleChangeFavorite} />
    :
    <BsHeart className="ml-2 text-dark" style={{ cursor: 'pointer' }} onClick={handleFavorite}
             onClick={handleChangeFavorite} />;
};
export default Favorite;
