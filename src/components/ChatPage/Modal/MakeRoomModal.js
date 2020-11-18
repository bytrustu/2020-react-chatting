import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MakeRoomModal = ({ show, setShow }) => {
  const user = useSelector(state => state.user.currentUser);
  const [inputs, setInputs] = useState({
    name: '',
    description: ''
  });

  const { roomName, description } = inputs;
  const [key, setKey] = useState('');
  const inputRef = useRef();

  const { chatRoomRef } = useSelector(state => state.chat);

  const isFormValid = (name, description) => name && description;

  const onChangeInput = useCallback((e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }, [roomName, description]);

  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(roomName, description)) {
      setKey(chatRoomRef.push().key);
    }
  }

  const addChatRoom = async () => {
    const newChatRoom = {
      id: key,
      name: roomName,
      description,
      createBy: {
        name: user.displayName,
        image: user.photoURL
      }
    }
    try {
      await chatRoomRef.child(key).update(newChatRoom);
      setInputs({
        ...inputs,
        name: '',
        description: '',
      });
      setKey('');
    } catch (error) {
      alert('오류가 발생했습니다!');
    } finally {
      setShow(false);
    }
  }

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show])


  useEffect(() => {
    if (key) {
      addChatRoom();
    }
  }, [key]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>채팅방 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>채팅방 이름</Form.Label>
              <Form.Control type="text" name="roomName" placeholder="채팅방 이름 작성" onChange={onChangeInput} ref={inputRef}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>채팅방 설명</Form.Label>
              <Form.Control type="text" name="description" placeholder="채팅방 설명을 작성" onChange={onChangeInput}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MakeRoomModal;
