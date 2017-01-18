import React from 'react';
import Square from './square.js';

const GameMap = ({
  board,
  boardW,
  tileSize,
  width,
  height,
  darkness,
  player,
}) => {

  let style = {
    width: width * tileSize,
    height: height * tileSize
  };


  let color;

  let gameMap = board.map((position, index) => {
    if (darkness) {

      // Convert index to x and y components
      let x = index % boardW;
      let y = Math.floor(index / boardW);

      // Distance Formula 
      let dist = Math.sqrt(
        Math.pow(x - player.x, 2) + Math.pow(y - player.y, 2)
      );

      // Comparison for assignement
      let isClose = dist < 6;

      if (isClose) {
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
          case 'weapon':
            color = 'orange';
            break;
          case 'door':
            color = 'purple';
            break;
          default:
            color = 'black';
            break;
        }
      } else {
        color = 'black';
      }

    } else {
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
        case 'weapon':
          color = 'orange';
          break;
        case 'door':
          color = 'purple';
          break;
        default:
          color = 'black';
          break;
      }
    }

    return <Square key={index} color={color} size={tileSize}/>
  });

  return (
    <div className="game-map" style={style}>
				{gameMap}			
			</div>
  );
};

export default GameMap;
