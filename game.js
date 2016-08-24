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
	for(var z = 0; z < playerCoords.length; z++){
		var xVal = playerCoords[z].x;
		var yVal = playerCoords[z].y;
		board[xVal][yVal].hasPlayerShip = true;
	}
}

module.exports.createAndPopulate = createAndPopulate;