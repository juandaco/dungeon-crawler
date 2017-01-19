import React from 'react';

const GameInfo = ({
	player,
	level,
	toggleDarkness,
}) => {

	return (
		<div className="game-info">

			<div className="info-container">
				<p><strong>Health:</strong> {player.health}</p>
				<p><strong>Weapon:</strong> {player.weapon.type}</p>
				<p><strong>Attack:</strong> {player.weapon.damage}</p>
				<p><strong>Level:</strong> {player.level}</p>
				<p><strong>NextLevel:</strong> {player.nextLevel} </p>
				<p><strong>Dungeon:</strong> {level} </p>
			</div>
			<button onClick={toggleDarkness}>Toggle Darkness</button>
		</div>
	);
}

export default GameInfo;