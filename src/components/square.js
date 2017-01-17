import React from 'react';

/*
	Stateless Component that renders each 
	Square of the board based on type
*/
const Square = ({ color, size }) => {
  let style = {
    width: size,
    height: size,
    margin: 0,
    backgroundColor: color
  };

  return (
    <div className="sqr" style={style}></div>
  );
}

export default Square;
