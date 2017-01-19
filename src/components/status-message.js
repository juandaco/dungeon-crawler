import React from 'react';

const StatusMessage = ({ won }) => {
  let style;
  if (won) {
    style = {
      backgroundColor: '#339966',
    };
  } else {
    style = {
      backgroundColor: '#ff3333',
    };
  }

  return (
    <div className="banner" style={style}>
    	<p>{won ? "You Won!!!" : "You Lost!!!"}</p>
    </div>
  );
}

export default StatusMessage;
