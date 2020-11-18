import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import firebase from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  setUser,
} from './redux/actions/user_action';
import Loading from './components/ChatPage/Loading/Loading';
import {
  setChatRoomRef,
  setMessagesRef, setTypingRef,
  setUsersRef,
} from './redux/actions/chat_action';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setChatRoomRef(firebase.database().ref('chatRooms')));
        dispatch(setMessagesRef(firebase.database().ref('messages')));
        dispatch(setUsersRef(firebase.database().ref('users')));
        dispatch(setTypingRef(firebase.database().ref('typing')));
        dispatch(setUser(user));
        history.push('/');
      } else {
        history.push('/login');
        dispatch(clearUser());
      }
    });
  }, []);


  return isLoading ? <Loading/> : (
    <Switch>
      <Route exact path="/" component={ChatPage} exact />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  )
}

export default App;
