import { ADD_CHAT_ROOM, CHANGE_CURRENT_CHAT_ROOM, SET_CHAT_ROOM_REF } from '../../types/types';

export const setChatRoomRef = (ref) => ({
  type: SET_CHAT_ROOM_REF,
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