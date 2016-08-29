// Handle game interactions
var MAX_BOARD_SIZE = 5;
var MAX_CPU_SHIPS = 10;
var MAX_PLAYER_SHIPS = 10;
var board = [];
function createAndPopulate(playerCoords) {
	// POPULATE 5x5 BOARD
	for (var i = 0; i < MAX_BOARD_SIZE; i++) {
		board[i] = [];
		for (var j = 0; j < MAX_BOARD_SIZE; j++) {
			board[i][j] = {
				hasPlayerShip : false,
				hasComputerShip : false,
				hasDestroyedShip : false
			}
		}
	}
	// PLACE PLAYER SHIPS
	for(var z = 0; z < playerCoords.length; z++){
		var xVal = playerCoords[z].x;
		var yVal = playerCoords[z].y;
		board[xVal][yVal].hasPlayerShip = true;
	}
	// PLACE COMPUTER SHIPS
	var shipsPlaced = 0;
	while(shipsPlaced != MAX_CPU_SHIPS){
		var cpuX = Math.floor((Math.random() * MAX_BOARD_SIZE));
		var cpuY = Math.floor((Math.random() * MAX_BOARD_SIZE));
		if(board[cpuX][cpuY].hasPlayerShip == false && board[cpuX][cpuY].hasComputerShip == false){
			board[cpuX][cpuY].hasComputerShip = true;
			console.log("Computer ship at: [" + cpuX + ", " + cpuY + "]");
			shipsPlaced++;
		} else {
			cpuX = Math.floor((Math.random() * MAX_BOARD_SIZE));
			cpuY = Math.floor((Math.random() * MAX_BOARD_SIZE));
		}
	}
}

function isHit(fireCoords){
	// Player hit
	if(board[fireCoords.fireX][fireCoords.fireY].hasComputerShip 
		&& !board[fireCoords.fireX][fireCoords.fireY].hasDestroyedShip 
		&& !board[fireCoords.fireX][fireCoords.fireY].hasPlayerShip){
		MAX_CPU_SHIPS--;
		board[fireCoords.fireX][fireCoords.fireY].hasDestroyedShip = true;
		return true;
	} else {
		return false;
	}
}
// Returns coordinates
function cpuShoot(){
	var cpuX = Math.floor((Math.random() * MAX_BOARD_SIZE));
	var cpuY = Math.floor((Math.random() * MAX_BOARD_SIZE));
	var cpuFired = false;
	while(cpuFired == false){
		// CPU hit
		if(board[cpuX][cpuY].hasPlayerShip 
			&& !board[cpuX][cpuY].hasDestroyedShip){
			MAX_PLAYER_SHIPS--;
			board[cpuX][cpuY].hasDestroyedShip = true;
			cpuFired = true;
		} else if(!board[cpuX][cpuY].hasPlayerShip 
					&& !board[cpuX][cpuY].hasDestroyedShip){
			// CPU miss
			cpuFired = true;
		} else {
			cpuX = Math.floor((Math.random() * MAX_BOARD_SIZE));
			cpuY = Math.floor((Math.random() * MAX_BOARD_SIZE));
		}
	}
	var cpuCoord = {"cpuX" : cpuX, "cpuY" : cpuY, "playerShipsLeft" : MAX_PLAYER_SHIPS, "cpuShipsLeft" : MAX_CPU_SHIPS};
	return cpuCoord;
}
function playerWon(){
	if(MAX_CPU_SHIPS == 0){
		return true;
	}
	return false;
}
function cpuWon(){
	if(MAX_PLAYER_SHIPS == 0){
		return true;
	}
	return false;
}


module.exports.createAndPopulate = createAndPopulate;
module.exports.isHit = isHit;
module.exports.cpuShoot = cpuShoot;
module.exports.playerWon = playerWon;
module.exports.cpuWon = cpuWon;