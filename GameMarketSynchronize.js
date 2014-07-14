var db;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};

function convertTimestampToUTC(date){
	try {
		return new Date(date - (new Date().getTimezoneOffset() * 60*1000)).toUTCString();		
	}
	catch(e)
	{
		console.error(e);
	}
}

function updateSyncData(playerid, data) {
	try {
		db.queryNoResults('UPDATE synchronize SET market=$2 WHERE playerid=$1;', 
				[playerid, convertTimestampToUTC(data)]);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * setData
 * @param data
 * @param gameSocket
 */
exports.setData = function (data, gameSocket) {	
	try {		
		db.queryResults(
			'UPDATE playertraining SET type=$2, level=$3, endtime=$4, cost=$5 WHERE playerid=$1;'
			,[
			  	data.playerID,
				data.training.trainingType,
				data.training.trainingLevel,
				convertTimestampToUTC(data.training.endTime),
			  	data.training.cost
			],
			function (results)	{
				updateSyncData(data.playerID, data.date);
				gameSocket.emit('saveTrainingResult', {result:1});				
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
};



/**
 * getMarketToBuy
 * @param data
 * @param gameSocket
 */
exports.getMarketToBuyList = function (data, gameSocket) {	
	try {
		db.queryResults(				 
			'SELECT p.name, p.wear, p.price, g.name FROM parts p LEFT JOIN partgroups g ON g.partGroupID = p.partGroupID WHERE p.status = 0;'
			,[data.playerID],
			function (results)	{			
				//console.log(results);
				gameSocket.emit('syncMarketToBuyList', results[0]);					
			}
		);
	}
	catch(e)	
	
	{
		console.error(e);
	}
};


/**
 * getMarketToSell
 * @param data
 * @param gameSocket
 */
exports.getMarketToSellList = function (data, gameSocket) {	
	try {
		db.queryResults(				 
			'SELECT p.name, p.wear, p.price, g.name FROM parts p LEFT JOIN partgroups g ON g.partGroupID = p.partGroupID WHERE p.status = 0;'
			,[data.playerID],
			function (results)	{			
				console.log(results);
				gameSocket.emit('syncMarketToSellList', results[0]);					
			}
		);
	}
	catch(e)	
	
	{
		console.error(e);
	}
};


export.setEvent(gameSocket){
	// Auth events
	gameSocket.on('register', register);
	gameSocket.on('login', login);
};


function register(data) {
	playerAuth.register(data, gameSocket);
}
