var db  = require('./Database');


/**
 * update skills
 * @param data
 * @param gameSocket
 */
exports.saveSkills = function (data, gameSocket) {	
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
 * getSkills
 * @param data
 * @param gameSocket
 */
exports.getSkills = function (data, gameSocket) {	
	try {
		db.queryResults(				 
				'SELECT strength, agility, speed, endurance FROM playerskills WHERE playerid=$1;'
				,[data['playerID']],
				function (results)	{				
					gameSocket.emit('resultSkills', {skills:results[0]});
					
				}
		);
	}
	catch(e)	
	
	{
		console.error(e);
	}
};




/**
 * update skills
 * @param data
 * @param gameSocket
 */
exports.addBadge = function (data, gameSocket) {	
	try {
		
		db.queryResults(
			'UPDATE playerskills SET email=$2, mobile=$3 WHERE playerid=$1;'
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
 * getBadges
 * @param data
 * @param gameSocket
 */
exports.getBadges = function (data, gameSocket) {	
	try {		
		db.queryResults(
			'SELECT badgeid FROM badgestoplayer WHERE playerid=$1;'
			,[data['playerID']],
			function (results)	{				
				gameSocket.emit('resultData', {achievements:results});				
			}
		);		
	}
	catch(e)
	{
		console.error(e);
	}
};



/**
 * update skills
 * @param data
 * @param gameSocket
 */
exports.addAchievement = function (data, gameSocket) {	
	try {		
		db.queryResults(
			'INSERT INTO achievementstoplayer (achievementid, playerid) VALUES($1, $2);'
			,[
			  data['playerID'],		
			  data['achievementID']	  
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
 * getAchievements
 * @param data
 * @param gameSocket
 */
exports.getAchievements = function (data, gameSocket) {	
	try {
		db.queryResults(
			'SELECT achievementid FROM achievementstoplayer WHERE playerid=$1;'
			,[data['playerID']],
			function (results)	{				
				gameSocket.emit('resultData', {achievements:results});				
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
};