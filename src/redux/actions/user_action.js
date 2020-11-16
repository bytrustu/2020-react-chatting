import {
  CLEAR_USER,
  SET_USER,
  SET_PHOTO_URL,
} from '../../types/types';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setPhotoURL = (photoURL) => ({
  type: SET_PHOTO_URL,
  payload: photoURL,
});