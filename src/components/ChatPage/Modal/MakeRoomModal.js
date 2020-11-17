import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MakeRoomModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>채팅방 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>채팅방 이름</Form.Label>
              <Form.Control type="text" placeholder="채팅방 이름 작성" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>채팅방 설명</Form.Label>
              <Form.Control type="text" placeholder="채팅방 설명을 작성" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            추가
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default MakeRoomModal;
