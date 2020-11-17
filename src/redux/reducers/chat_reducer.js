import { ADD_CHAT_ROOM, CHANGE_CURRENT_CHAT_ROOM, SET_CHAT_ROOM_REF } from '../../types/types';

const initialUserState = {
  chatRoomRef: null,
  chatRoomList: null,
  currentChatRoom: null,

};

export default function(state = initialUserState, action) {
  switch (action.type) {
    case SET_CHAT_ROOM_REF: {
      return {
        ...state,
        chatRoomRef: action.payload
      };
    }
    case ADD_CHAT_ROOM: {
      return {
        ...state,
        chatRoomList: action.payload
      };
    }
    case CHANGE_CURRENT_CHAT_ROOM: {
      return {
        ...state,
        currentChatRoom: { ...action.payload }
      };
    }
    default:
      return state;
  }
}