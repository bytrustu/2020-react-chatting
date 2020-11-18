import React from 'react';
import { ProgressBar } from 'react-bootstrap';


const Progress = ({now}) => {
  return (
    <div className="prgress-container">
      <ProgressBar now={now} label={`${now}%`} />
    </div>
  );
};

export default Progress;
