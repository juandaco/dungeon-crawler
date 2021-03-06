import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './App.css';

// Components
import GameInfo from './components/game-info';
import GameMap from './components/game-map';
import StatusMessage from './components/status-message';


class App extends Component {
  constructor() {
    super();

    let boardW = 70;
    let boardH = 50;
    let board = new Array(boardW * boardH).fill(0);

    this.state = {
      tileSize: 15,
      boardW,
      boardH,
      board,
      darkness: true,
      enemies: [],
      weapons: [
        { type: 'Dagger', damage: 14 },
        { type: 'Mace', damage: '10' },
        { type: 'Axe', damage: '15' },
        { type: 'dagger', damage: '20' },
      ],
      player: {
        x: 0,
        y: 0,
        health: 10,
        level: 0,
        nextLevel: 60,
        experience: 0,
        weapon: {
          type: 'Wooden Stick',
          damage: 7
        },
      },
      boss: {},
      level: 0,
      showMessage: false,
      won: false,
    };

    // Method's bindings
    this.createMap = this.createMap.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.toggleDarkness = this.toggleDarkness.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.addHealth = this.addHealth.bind(this);
    this.foundWeapon = this.foundWeapon.bind(this);
    this.enemyFight = this.enemyFight.bind(this);
    this.bossFight = this.bossFight.bind(this);
    this.gameLost = this.gameLost.bind(this);
    this.gameWon = this.gameWon.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    // Create Map at Startup Time
    this.createMap();

    // Add Keyboard Event Listener
    window.onkeydown = (e) => {
      this.handleKeyboard(e);
    };
  }

  handleKeyboard(e) {
    if (!this.state.showMessage) {
      // Variable declaration
      let player = this.state.player;
      let index = player.x + player.y * this.state.boardW;
      let posValue, posIndex;

      // Only Receive Input when the end game message isn't showing
      switch (e.key) {
        case 'ArrowRight':
        	e.preventDefault();
          posIndex = index + 1;
          break;
        case 'ArrowLeft':
        	e.preventDefault();
          posIndex = index - 1;
          break;
        case 'ArrowUp':
        	e.preventDefault();
          posIndex = index - this.state.boardW;
          break;
        case 'ArrowDown':
        	e.preventDefault();
          posIndex = index + this.state.boardW;
          break;
        default:
          break;
      }

      posValue = this.state.board[posIndex];

      if (posValue === 1) { // Empty Space
        this.movePlayer(posIndex);
      } else if (posValue === 'health') {
        this.addHealth();
        this.movePlayer(posIndex);
      } else if (posValue === 'weapon') {
        this.foundWeapon();
        this.movePlayer(posIndex);
      } else if (posValue === 'enemy') {
        this.enemyFight(posIndex);
      } else if (posValue === 'door') {
        this.nextLevel();
      } else if (posValue === 'boss') {
        this.bossFight(posIndex);
      }
    }
  }

  movePlayer(posIndex) {
    let newBoard = this.state.board.slice();
    let player = this.state.player;

    newBoard[(player.x + player.y * this.state.boardW)] = 1;

    player.x = posIndex % this.state.boardW;
    player.y = Math.floor(posIndex / this.state.boardW);
    newBoard[posIndex] = 'player';
    this.setState({
      player,
      board: newBoard,
    });
  }

  addHealth() {
    let player = this.state.player;
    player.health += 20;
    this.setState({
      player,
    });
  }

  foundWeapon() {
    let player = this.state.player;
    player.weapon = this.state.weapons[this.state.level];
    this.setState({
      player,
    });
  }

  enemyFight(posIndex) {
    let player = this.state.player;
    let newBoard = this.state.board.slice();
    let newEnemies = this.state.enemies.slice();
    let enemyIndex;

    // Find enemy in array
    let enemy = this.state.enemies.find((e, i) => {
      enemyIndex = i;
      return e.index === posIndex;
    });

    // Enemy Health lose for each attack
    enemy.health -= Math.round(
      (player.weapon.damage * 0.7) +
      (player.weapon.damage * Math.random() * 0.3)
    );

    // Delete enemy if it's dead
    if (enemy.health <= 0) {
      newEnemies.splice(enemyIndex, 1);
      player.experience += 10;
      newBoard[posIndex] = 1;

    } else {
      newEnemies[enemyIndex] = enemy;
    }

    // Player looses health in each attack
    player.health -= Math.round(
      ((this.state.level + 1) * 10 * Math.random())
    );


    // Loose game 
    if (player.health <= 0) {
      this.gameLost();
    } else {
      this.setState({
        board: newBoard,
        enemies: newEnemies,
        player,
      });
    }
  }

  bossFight(posIndex) {

  }

  nextLevel() {
    this.setState({
      level: this.state.level + 1,
    });

    this.createMap();
  }

  gameLost() {
    let player = this.state.player;
    player.health = 0;
    this.setState({
      player,
      showMessage: true,
      won: false,
    });
    setTimeout(() => {
      this.restartGame();
    }, 2000);
  }

  gameWon() {
  	this.setState({
  	  showMessage: true,
  	  won: true,
  	});
  	setTimeout(() => {
  	  this.restartGame();
  	}, 2000);

  }

  restartGame() {
    this.setState({
      enemies: [],
      player: {
        x: 0,
        y: 0,
        health: 10,
        level: 0,
        nextLevel: 60,
        experience: 0,
        weapon: {
          type: 'Wooden Stick',
          damage: 7
        },
      },
      level: 0,
      showMessage: false,
      won: false,
    });
    this.createMap();
  }

  toggleDarkness() {
    this.setState({
      darkness: !this.state.darkness,
    });
  }

  toggleMessage() {
    this.setState({
      showMessage: !this.state.showMessage,
    });
  }

  clearBoard() {
    let newBoard = this.state.board.slice();
    newBoard.fill(0);
    this.setState({
      board: newBoard
    });
  }

  createMap() {

    // Copy the by value for avoiding mutations.
    let newBoard = new Array(this.state.boardW * this.state.boardH).fill(0);

    // Generates a Random Rectangle within board limits
    const randomRect = () => {
      //RoomSpecs
      let maxSize = 15;
      let minSize = 5;
      let distFromBorder = 2;

      const w = Math.round(Math.random() * (maxSize - minSize)) + minSize;
      const h = Math.round(Math.random() * (maxSize - minSize)) + minSize;
      const x = Math.max(Math.round(this.state.boardW * Math.random() - w - distFromBorder), distFromBorder);
      const y = Math.max(Math.round(this.state.boardH * Math.random() - h - distFromBorder), distFromBorder);

      return { x, y, w, h };
    };


    // Given 2 rects determines if they superipose
    const itCollides = (newRect, rect) => {
      //A la Derecha y Abajo
      return ((newRect.x >= rect.x && newRect.x <= (rect.x + rect.w)) &&
          (newRect.y >= rect.y && newRect.y <= (rect.y + rect.h))) ||
        //A la Derecha y Arriba
        ((newRect.x >= rect.x && newRect.x <= (rect.x + rect.w)) &&
          (newRect.y <= rect.y && (newRect.y + newRect.h) >= rect.y)) ||
        // A la Izquierda y Abajo
        ((newRect.x <= rect.x && (newRect.x + newRect.w) >= rect.x) &&
          (newRect.y >= rect.y && newRect.y <= (rect.y + rect.h))) ||
        // A la Izquierda y Arriba
        ((newRect.x <= rect.x && (newRect.x + newRect.w) >= rect.x) &&
          (newRect.y <= rect.y && (newRect.y + newRect.h) >= rect.y));
    }


    // Given a Rectangle returns its indexes in the board
    const getRectPos = (rect) => {
      const startIndex = rect.x + rect.y * this.state.boardW;
      let indexes = [];

      for (let y = 0; y < rect.h; y++) {
        for (let x = 0; x < rect.w; x++) {
          indexes.push((x + startIndex) + (y * this.state.boardW));
        }
      }

      return indexes;
    };


    // Draws a given array of Indexes in the Board
    const setPosInBoard = (array) => {
      for (let i = 0; i < array.length; i++) {
        newBoard[array[i]] = 1;
      }
    };

    // Generates a path given two rectangles
    const createPath = (rect1, rect2) => {
      let path = [];
      let dist = {};

      let newRect1 = {
        x: rect1.x + Math.floor(rect1.w / 2),
        y: rect1.y + Math.floor(rect1.h / 2),
      };

      let newRect2 = {
        x: rect2.x + Math.floor(rect2.w / 2),
        y: rect2.y + Math.floor(rect2.h / 2),
      };

      dist.x = newRect2.x - newRect1.x;

      dist.dirX = dist.x > 0 ? 'right' : 'left';
      dist.x = Math.abs(dist.x);

      dist.y = newRect2.y - newRect1.y;
      dist.dirY = dist.y > 0 ? 'down' : 'up';
      dist.y = Math.abs(dist.y);


      if (dist.dirX === 'right') {
        for (let j = 0; j < dist.x; j++) {
          path.push([newRect1.x + j, newRect1.y]);
        }

      } else { // 'left'
        for (let j = 0; j < dist.x; j++) {
          path.push([newRect1.x - j, newRect1.y]);
        }
      }

      if (dist.dirY === 'up') {
        for (let j = 0; j < dist.y; j++) {
          path.push([newRect2.x, newRect1.y - j]);
        }
      } else { // 'down'
        for (let j = 0; j < dist.y; j++) {
          path.push([newRect2.x, newRect1.y + j]);
        }
      }

      let pathPos = path.map((p, i) => {
        p = path[i];
        return p[0] + p[1] * this.state.boardW;
      })

      return pathPos;
    };


    let notFilled = true;
    let attempts = 0;
    let rectangles = [];
    let roomCount = 15;
    let paths = [];

    // Create rectangles in empty space.
    while (notFilled) {
      attempts++;
      let newRect = randomRect();
      let isEmpty = true;

      for (let i = 0; i < rectangles.length; i++) {
        let rect = rectangles[i];
        if (itCollides(newRect, rect)) {
          isEmpty = false;
          break;
        }
      }

      // Add the rectangles that won't
      if (isEmpty) {
        attempts = 0;
        rectangles.push(newRect);
      }

      // Stop if room count is reached
      if (rectangles.length === roomCount) {
        notFilled = false;
        break;
      }

      // Stop wen the amount of rooms can't be reached
      if (attempts > 1000) {
        notFilled = false;
        break;
      }
    }

    // Sort for better path drawing
    rectangles.sort(function(a, b) {
      return (a.x - b.x);
    });

    // Create Paths
    for (let i = 0; i < rectangles.length; i++) {
      let rect1 = rectangles[i];
      let rect2 = rectangles[i + 1];
      if (rect1 && rect2) {
        rect1.connected++;
        rect2.connected++;
        let path = createPath(rect1, rect2);
        path.forEach(p => paths.push(p));
      }
    }

    // Convert Rectangles to Board positions
    let posGeneral = [];
    for (let i = 0; i < rectangles.length; i++) {
      let rectPos = getRectPos(rectangles[i]);
      posGeneral = posGeneral.concat(rectPos);
    }

    // Set Rectangles in the board
    setPosInBoard(posGeneral);

    // Get possible sposts on the board
    let possible = newBoard.map((position, index) => {
      if (position) {
        return index;
      } else {
        return undefined;
      }
    }).filter((position => position));


    // Set Paths in board
    setPosInBoard(paths);


    let enemies = new Array(14);
    // Create Enemies
    for (let i = 0; i < enemies.length; i++) {
      let rnd = possible[Math.floor(Math.random() * possible.length)];
      possible.splice(possible.indexOf(rnd), 1);
      newBoard[rnd] = 'enemy';
      let enemy = {
        index: rnd,
        health: 30,
      };
      enemies[i] = enemy;
    }


    // Health Item Number given by loop
    for (let i = 0; i < 12; i++) {
      let rnd = possible[Math.floor(Math.random() * possible.length)];
      possible.splice(possible.indexOf(rnd), 1);
      newBoard[rnd] = 'health';
    }


    // Weapon for level
    let rnd = possible[Math.floor(Math.random() * possible.length)];
    possible.splice(possible.indexOf(rnd), 1);
    newBoard[rnd] = 'weapon';


    // Door to next level
    rnd = possible[Math.floor(Math.random() * possible.length)];
    possible.splice(possible.indexOf(rnd), 1);
    newBoard[rnd] = 'door';


    // Player Position in board
    rnd = possible[Math.floor(Math.random() * possible.length)];
    newBoard[rnd] = 'player';
    possible.splice(possible.indexOf(rnd), 1);
    let player = this.state.player;
    player.x = rnd % this.state.boardW;
    player.y = Math.floor(rnd / this.state.boardW);


    this.setState({
      board: newBoard,
      enemies: enemies,
      player,
    });
  }

  render() {
    let statMsg = <StatusMessage key={"banner"} won={this.state.won}/>;
    return (
      <div className="App" >
      	<header>
      		<h1 className="title">React Dungeon Crawler</h1>
      		<h4 className="subtitle">Beat the boss in level 4</h4>
      	</header>
      	<GameInfo 
      		player={this.state.player} 
      		level={this.state.level}
      		toggleDarkness={this.toggleDarkness} 
      	/>
      	{/* For positionning the player over GameMap */}
      	<div className="player-positioner">
	      	<GameMap 
	      		board={this.state.board}
	      		boardW={this.state.boardW}
	      		boardH={this.state.boardH}
	      		tileSize={this.state.tileSize}
	      		darkness={this.state.darkness}
	      		player={this.state.player}
	      	/>
      	</div>
      	<ReactCSSTransitionGroup
          transitionName="message"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
	      	{this.state.showMessage ? statMsg : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}


export default App;
