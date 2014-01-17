var currentArray;
var date;
var socket;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};



function updateSyncData(playerid, data) {
	try {
		console.log(data);
		db.queryNoResults('UPDATE synchronize SET achievements=$2 WHERE playerid=$1;', 
			[playerid, new Date(data - (new Date().getTimezoneOffset() * 60*1000)).toUTCString()]);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * grantAchievement
 * @param achievementID
 * @param playerID
 */

function grantAchievement(gameSocket, arrayIndex, playerID) {
	try {
		db.queryResults(
			'INSERT INTO achievementtoplayer (playerid, achievementid, granted) VALUES($1,$2, $3);'
			,[
			  	playerID,
			  	currentArray[arrayIndex].id,
			  	new Date(date - (new Date().getTimezoneOffset() * 60*1000)).toUTCString()	
			],
			function (results)	{
				console.log("ADD");	
				findAchievement(gameSocket, arrayIndex+1, playerID);
			}
		);		
	}
	catch(e)		
	{
		console.error(e);
	}
}

/**
 * findAchievement
 * @param achievementID
 * @param playerID
 */
function findAchievement(gameSocket, arrayIndex, playerID) {
	try {		
		if (arrayIndex < currentArray.length) {
			db.queryResults(
				'SELECT * FROM achievementtoplayer WHERE playerid=$1 AND achievementid=$2;'
				,[
				  	playerID,
				  	currentArray[arrayIndex].id
				],
				function (results)	{
					//if not found add achievement
					if (results.length==0) {					
						grantAchievement(gameSocket, arrayIndex, playerID);						
					}
					else 				
					//next if array size is less					
						findAchievement(gameSocket, arrayIndex+1, playerID);
					
				}
			);		
			
		}	
		else {
			gameSocket.emit('saveAchievementsResult', {result:1});					
			updateSyncData(playerID, date);
		}
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
		if (data!= undefined) {
			currentArray = data.achievements;
			console.log("GameAchievementsSynchronization:setData");
			socket = gameSocket;
			date = data.date;
		
			findAchievement(gameSocket, 0, data.playerID);		
		}
	}
	catch(e)
	{
		console.error(e);
	}
};




/***********
 * GET DATA METHOD
 */

/**
 * resultAchievementData
 * @param gameSocket
 * @param achievements
 * @param playerID
 */

function resultAchievementData(gameSocket, achievements, playerID) {
	try {
		db.queryResults(
			'SELECT achievements FROM synchronize WHERE playerid=$1;',
			[playerID],
			function (results) {
				gameSocket.emit('syncAchievementsResultData', {
					'date':results[0],
					'achievements':achievements
				});	
			}
		);
		
	}
	catch (e) {
		console.error(e);
	}
}


/**
 * getData
 * @param data
 * @param gameSocket
 */
exports.getData = function (data, gameSocket) {	
	try {
		console.log("GameAchievementsSynchronization:getData");
		db.queryResults(
			'SELECT achievementid AS id FROM achievementtoplayer WHERE playerid=$1;', [data.playerID],
			function (results)	{
				//result data
				console.log(results);
				//get sync data
				resultAchievementData(gameSocket, results, data.playerID);
							
			}
		);
		
	}
	catch(e)	
	
	{
		console.error(e);
	}
};
