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
			'UPDATE playerskills SET strength=$2, agility=$3, speed=$4, endurance=$5 WHERE playerid=$1;'
			,[
			  	data.playerID,
				data.skills.strength,
				data.skills.agility,
			  	data.skills.speed,
			  	data.skills.endurance
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
