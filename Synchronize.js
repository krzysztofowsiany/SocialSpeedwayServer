var db;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};

/**
 * profileCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function profileCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
			"SELECT profile FROM synchronize WHERE playerid=$1"
			,[playerID],
			function (results)	{			
				var res = 0;
				if (date > results[0].profile)
					res = -1;
				else if (date < results[0].profile)
					res = 1;
				
				console.log("profile: "+res);
				gameSocket.emit('syncProfileCheckResult', res);					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * skillsCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function skillsCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
			"SELECT skills FROM synchronize WHERE playerid=$1;"
			,[playerID],
			function (results)	{	
				var res = 0;
				if (date > results[0].skills)
					res = -1;
				else if (date < results[0].skills)
					res = 1;
				console.log("skills: "+res);
				gameSocket.emit('syncSkillsCheckResult', res);					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * trainingCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function trainingCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
			"SELECT training FROM synchronize WHERE playerid=$1 ;"
			,[playerID],
			function (results)	{	
				var res = 0;
				if (date > results[0].training)
					res = -1;
				else if (date < results[0].training)
					res = 1;
				console.log("training: "+res);
				gameSocket.emit('syncTrainingCheckResult', res);					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * badgesCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function badgesCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
			"SELECT badges FROM synchronize WHERE playerid=$1;"
			,[playerID],
			function (results)	{					
				var res = 0;
				if (date > results[0].badges)
					res = -1;
				else if (date < results[0].badges)
					res = 1;
				console.log("badgess: "+res);
				gameSocket.emit('syncBadgesCheckResult', res);					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
}

/**
 * achievementsCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function achievementsCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
			"SELECT achievements FROM synchronize WHERE playerid=$1;"
			,[playerID],
			function (results)	{					
				var res = 0;
				if (date > results[0].achievements)
					res = -1;
				else if (date < results[0].achievements)
					res = 1;
				console.log("achievements: "+res);
				gameSocket.emit('syncAchievementsCheckResult', res);					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
}


/**
 * check
 * @param data
 * @param gameSocket
 */
exports.check = function (data, gameSocket) {
	//data.what
	//data.date	  		
	//data.playerID	
	//console.log(data);
	switch (data.what) {
		case 'profile':
			profileCheck(gameSocket, data.date, data.playerID);
			break;
			
		case 'skills':
			skillsCheck(gameSocket, data.date, data.playerID);
			break;
			
		case 'training':
			trainingCheck(gameSocket, data.date, data.playerID);
			break;
			
		case 'badges':
			badgesCheck(gameSocket, data.date, data.playerID);
			break;
			
		case 'achievements':			
			achievementsCheck(gameSocket, data.date, data.playerID);
			break;
	}
};