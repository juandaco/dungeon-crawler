import React, { Component } from 'react';
import Square from './square.js';

class GameMap extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		let board = this.props.board;
		let newBoard = nextProps.board;

		let returner = false;
		for (let i = 0; i < board.length; i++) {
			if(board[i] !== newBoard[i]) {
				returner =  true;
				break;
			} 
		}

		return returner;
	}

  render() {
  	let tileSize = this.props.tileSize;
  	let width = this.props.width;
  	let height = this.props.height;
  	let board = this.props.board;

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

      return <Square key={index} color={color} size={tileSize}/>
    });

    return (
      <div className="game-map" style={style}>
				{gameMap}			
			</div>
    );
  }
}

export default GameMap;
