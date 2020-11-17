import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const Progress = () => {
  return (
    <div className="prgress-container">
      <ProgressBar now={60} />
    </div>
  );
};

export default Progress;
