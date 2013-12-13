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
				'UPDATE playerprofiles SET name=$2, surname=$3, age=$4, sex=$5 WHERE playerid=$1;'
				,[
				  data['playerID'],
				  data['name'],
				  data['surname'],
				  data['age'],
				  data['sex'],				  		
				],
				function (results)	{
						
					gameSocket.emit('saveProfileResult', {result:1});
						
				}
			);
		updatePlayerModified(data['playerID']);
	}
	catch(e)
	{
		console.error(e);
	}
};

/**
 * save contact
 * @param data
 * @param gameSocket
 */
exports.saveContact = function (data, gameSocket) {	
	try {
		
		db.queryResults(
			'UPDATE playercontacts SET email=$2, mobile=$3 WHERE playerid=$1;'
			,[
			  data['playerID'],		
			  data['email'],
			  data['mobile']			  
			],
			function (results)	{
				gameSocket.emit('saveContactResult', {result:1});
				
			}
		);
		
		updatePlayerModified(data['playerID']);
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
				'SELECT pp.name, pp.surname, pp.age, pp.sex, pc.email, pc.mobile FROM players p JOIN playercontacts pc ON pc.playerid=p.playerid JOIN playerprofiles pp ON pp.playerid=p.playerid WHERE p.playerid=$1;'
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