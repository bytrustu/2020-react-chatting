import {
  ADD_CHAT_ROOM,
  CHANGE_CURRENT_CHAT_ROOM,
  SET_CHAT_ROOM_REF,
  SET_MESSAGES_REF,
  SET_TYPING_REF,
} from '../../types/types';

const initialUserState = {
  chatRoomRef: null,
  messagesRef: null,
  chatRoomList: null,
  currentChatRoom: null,
  typingRef: null,

};

export default function(state = initialUserState, action) {
  switch (action.type) {
    case SET_CHAT_ROOM_REF: {
      return {
        ...state,
        chatRoomRef: action.payload
      };
    }
    case SET_MESSAGES_REF: {
      return {
        ...state,
        messagesRef: action.payload
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
    case SET_TYPING_REF: {
      return {
        ...state,
        typingRef: action.payload,
      };
    }
    default:
      return state;
  }
}