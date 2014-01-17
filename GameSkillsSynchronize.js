var db;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};


function updateSyncData(playerid, data) {
	try {		
		db.queryNoResults('UPDATE synchronize SET skills=$2 WHERE playerid=$1;', 
				[playerid, new Date(data - (new Date().getTimezoneOffset() * 60*1000)).toUTCString()]);
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
				updateSyncData(data.playerID, data.date);
				gameSocket.emit('saveSkillsResult', {result:1});				
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
			'SELECT p.strength, p.agility, p.speed, p.endurance, s.skills FROM playerskills p JOIN synchronize s ON s.playerid=p.playerid WHERE p.playerid=$1;'
			,[data.playerID],
			function (results)	{				
				gameSocket.emit('syncSkillsResultData', results[0]);					
			}
		);
	}
	catch(e)	
	
	{
		console.error(e);
	}
};
