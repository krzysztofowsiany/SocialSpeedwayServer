var db  = require('./Database');


function updatePlayerModified(playerid) {
	try {
		db.queryNoResults('UPDATE playerdatalogs SET modified=now() WHERE playerid=$1;', [playerid]);
	}
	catch(e)
	{
		console.error(e);
	}
}

function updateSyncData(playerid, data) {
	try {		
		//console.log(new Date(data).toUTCString());
		//var d = new Date(data);
		
		db.queryNoResults('UPDATE synchronize SET profile=$2 WHERE playerid=$1;', 
				[playerid, new Date(data - (new Date().getTimezoneOffset() * 60*1000)).toUTCString()]);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * save profile
 * @param data
 * @param gameSocket
 */
exports.setData = function (data, gameSocket) {
	try {		
		console.log("GameProfileSynchronization:setData");
		db.queryResults(
				'UPDATE playerprofiles SET name=$2, surname=$3, age=$4, sex=$5,mobile=$6 WHERE playerid=$1;'
				,[
				  data.playerID,
				  data.profile.name,
				  data.profile.surname,
				  data.profile.age,
				  data.profile.sex,				  		
				  data.profile.mobile,
				],
				function (results)	{						
					updateSyncData(data.playerID, data.date);
					gameSocket.emit('saveProfileResult', {result:1});						
				}
			);
		updatePlayerModified(data.playerID);
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
		console.log("GameProfileSynchronization:getData");
		db.queryResults(
				'SELECT p.name, p.surname, p.age, p.sex, p.mobile, s.profile FROM playerprofiles p JOIN synchronize s ON s.playerid=p.playerid WHERE p.playerid=$1;'
				,[data['playerID']],
				function (results)	{				
					gameSocket.emit('syncProfileResultData', results[0]);
					
				}
		);
	}
	catch(e)
	{
		console.error(e);
	}
};