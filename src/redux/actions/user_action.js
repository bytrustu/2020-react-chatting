import {
  SET_USER,
} from '../../types/types'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});