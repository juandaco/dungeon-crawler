import React from 'react';
import Square from './square.js'


const GameMap = ({ board, width, height, tileSize }) => {
  let style = {
    width: width * tileSize,
    height: height * tileSize
  };

  let color;
  let gameMap = board.map((position, index) => {

    switch (position) {
      case 1: // Tile
        color = 'white';
        break;
      case 0:
        color = 'grey';
        break;
      case 'enemy':
        color = 'red';
        break;
      case 'health':
        color = 'green';
        break;
      case 'player':
        color = 'blue';
        break;
      default:
        color = 'black';
        break;
    }

    return <Square key={index} color={color} size={tileSize}/>
  });

  return (
    <div className="game-map" style={style}>
			{gameMap}
		</div>
  );
}

export default GameMap;