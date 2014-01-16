var db  = require('./Database');


function updateSyncData(playerid, data) {
	try {
		db.queryNoResults('UPDATE synchronize SET training=$2 WHERE playerid=$1;', [playerid, data]);
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
			'UPDATE playertraining SET type=$2, level=$3, endtime=$4, costend=$5 WHERE playerid=$1;'
			,[
			  	data.playerID,
				data.training.type,
				data.training.value,
			  	data.training.end,
			  	data.training.cost
			],
			function (results)	{
				updateSyncData(data.playerID, data.date)
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
				'SELECT p.strength, p.agility, p.speed, p.endurance, s.training FROM playerskills p JOIN synchronize s ON s.playerid=p.playerid WHERE p.playerid=$1;'
				,[data['playerID']],
				function (results)	{				
					gameSocket.emit('syncTrainingResultData', results[0]);					
				}
		);
	}
	catch(e)	
	
	{
		console.error(e);
	}
};
