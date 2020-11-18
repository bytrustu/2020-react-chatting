import {
  CLEAR_USER, SET_PHOTO_URL,
  SET_USER, SET_USERS_REF,
} from '../../types/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
  usersRef: null,
};

export default function(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: {...state.currentUser, photoURL: action.payload },
        isLoading: false,
      };
    case SET_USERS_REF:
      return {
        ...state,
        usersRef: action.payload,
      };
    default:
      return state;
  }
}