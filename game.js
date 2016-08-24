// Handle game interactions
var MAX_BOARD_SIZE = 5;

function createAndPopulate(playerCoords) {
	// POPULATE 5x5 BOARD
	var board = [];
	for (var i = 0; i < MAX_BOARD_SIZE; i++) {
		board[i] = [];
		for (var j = 0; j < MAX_BOARD_SIZE; j++) {
			board[i][j] = {
				hasPlayerShip : false,
				hasComputerShip : false
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
	while(shipsPlaced != 10){
		var cpuX = Math.floor((Math.random() * 5));
		var cpuY = Math.floor((Math.random() * 5));
		if(board[cpuX][cpuY].hasPlayerShip == false && board[cpuX][cpuY].hasComputerShip == false){
			board[cpuX][cpuY].hasComputerShip = true;
			shipsPlaced++;
		} else{
			cpuX = Math.floor((Math.random() * 5));
			cpuY = Math.floor((Math.random() * 5));
		}
	}
}

module.exports.createAndPopulate = createAndPopulate;