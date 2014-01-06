var db  = require('./Database');

/**
 * profileCheck
 * @param gameSocket
 * @param date
 * @param playerID 
 */
function profileCheck(gameSocket, date, playerID) {
	try {		
		db.queryResults(
				'SELECT profile FROM synchronize WHERE playerid=$1;'
				,[playerID],
				function (results)	{	
					//console.log(results[0].profile);
					var res = 0;
					if (date > results[0].profile)
						res = -1;
					else if (date < results[0].profile)
						res = 1;
					
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
 * check
 * @param data
 * @param gameSocket
 */
exports.check = function (data, gameSocket) {
	//data.what
	//data.date	  		
	//data.playerID	
	switch (data.what) {
		case 'profile':
			profileCheck(gameSocket, data.date, data.playerID);
			break;
			
		case 'skills':
			break;
			
		case 'training':
			break;
			
		case 'badges':
			break;
			
		case 'achievements':
			break;
	}
};