import {
  ADD_CHAT_ROOM,
  CHANGE_CURRENT_CHAT_ROOM,
  SET_CHAT_ROOM_REF,
  SET_MESSAGES_REF, SET_TYPING_REF,
  SET_USERS_REF,
} from '../../types/types';

export const setChatRoomRef = (ref) => ({
  type: SET_CHAT_ROOM_REF,
  payload: ref,
});

export const setMessagesRef = (ref) => ({
  type: SET_MESSAGES_REF,
  payload: ref,
});

export const setUsersRef = (ref) => ({
  type: SET_USERS_REF,
  payload: ref,
});

export const setTypingRef = (ref) => ({
  type: SET_TYPING_REF,
  payload: ref,
});

export const addChatRoom = (payload) => ({
  type: ADD_CHAT_ROOM,
  payload,
});

export const changeCurrentChatRoom = (payload) => ({
  type: CHANGE_CURRENT_CHAT_ROOM,
  payload,
});