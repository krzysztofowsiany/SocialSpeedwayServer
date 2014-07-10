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
		db.queryNoResults('UPDATE synchronize SET training=$2 WHERE playerid=$1;', 
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
 * getData
 * @param data
 * @param gameSocket
 */
exports.getData = function (data, gameSocket) {	
	try {
		db.queryResults(				 
			'SELECT t.type, t.level, t.endtime, t.cost, s.training FROM playertraining t JOIN synchronize s ON t.playerid=s.playerid WHERE t.playerid=$1;'
			,[data.playerID],
			function (results)	{			
				console.log(results);
				gameSocket.emit('syncTrainingResultData', results[0]);					
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
