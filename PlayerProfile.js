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

/**
 * save profile
 * @param data
 * @param gameSocket
 */
exports.saveProfile = function (data, gameSocket) {
	try {		
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
		db.queryResults(
				'SELECT pp.name, pp.surname, pp.age, pp.sex, pp.mobile FROM players p JOIN playerprofiles pp ON pp.playerid=p.playerid WHERE p.playerid=$1;'
				,[data['playerID']],
				function (results)	{				
					gameSocket.emit('resultData', {profile:results[0]});
					
				}
		);
	}
	catch(e)
	{
		console.error(e);
	}
};