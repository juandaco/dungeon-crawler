import React from 'react';


const Player = ({ player, tileSize }) => {

  let style = {
    width: tileSize,
    height: tileSize,
    position: 'absolute',
    left: player.x * tileSize,
    top: player.y * tileSize,
    margin: 0,
    backgroundColor: 'blue',
  };

  return (
    <div className="player" style={style}></div>
  );
}

export default Player;
