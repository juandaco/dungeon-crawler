import React from 'react';

const StatusMessage = ({ won }) => {
  let style;
  if (won) {
    style = {
      backgroundColor: 'green',
    };
  } else {
    style = {
      backgroundColor: 'red',
    };
  }

  return (
    <div className="banner" style={style}>
    	<p>{won ? "You Won!!!" : "You Lost!!!"}</p>
    </div>
  );
}

export default StatusMessage;
