import React, { useRef } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../firebase';
import mime from 'mime-types';
import { setPhotoURL } from '../../../redux/actions/user_action';

const UserPanel = () => {

  const dispatch = useDispatch();
  const { displayName, photoURL, uid } = useSelector(state => state.user.currentUser);
  const inputOpenImageRef = useRef();

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      const uploadTaskSnapshot = await firebase
        .storage()
        .ref()
        .child(`user/image/${uid}`)
        .put(file, metadata);

      const downloadUrl = await uploadTaskSnapshot.ref.getDownloadURL();

      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadUrl,
      });
      dispatch(setPhotoURL(downloadUrl));

      await firebase.database().ref('users')
        .child(uid)
        .update({ image: downloadUrl });

      alert('프로필이 변경 되었습니다.');
    } catch (e) {
      alert('프로필 변경 실패!');
    }

  };

  return (
    <div className="userinfo-container" onClick={handleOpenImageRef}>
      <Image src={photoURL} style={{ width: '30px', height: '30px', marginTop: '3px' }} roundedCircle />
      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        type="file"
        ref={inputOpenImageRef}
        style={{ display: 'none' }}
      />
      <h5 className="userinfo-text d-inline-block ml-2">{displayName}</h5>
    </div>
  );
};

export default UserPanel;
