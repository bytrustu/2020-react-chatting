import React from 'react';
import { Button, Form } from 'react-bootstrap';

const MessageForm = ({
                       handleSubmit,
                       content,
                       handleOnChange,
                       inputRef,
                       loading,
                       handleOpenImageUpload,
                       handleUploadImage,
                       fileRef,
                     }) => (
  <Form style={{ height: '100%' }} onSubmit={handleSubmit}>
    <input
      type="text"
      style={{
        width: '80%',
        height: '100%',
        border: '0',
        padding: '20px',
        resize: 'none',
      }}
      value={content}
      onChange={handleOnChange}
      ref={inputRef}
    />
    <Button variant='default'
            style={{
              width: '10%',
              height: '100%',
            }}
            disabled={loading}
            onClick={handleOpenImageUpload}
    >첨부
    </Button>
    <input
      onChange={handleUploadImage}
      accept="image/jpeg, image/png"
      type="file"
      ref={fileRef}
      style={{ display: 'none' }}
    />
    <Button type="submit"
            variant='primary'
            onSubmit={handleSubmit}
            disabled={loading}
            style={{
              width: '10%',
              height: '100%',
            }}>전송</Button>
  </Form>);

export default MessageForm;
