var db  = require('./Database');

/**
 * register new user if not exist
 * @param data
 * @param gameSocket
 */
exports.register = function (data, gameSocket) {
	try {
		db.queryResults('SELECT * FROM players WHERE name=$1 LIMIT 1;', [data['name']],
			function (results)	{				
				if (results.length>0){
					gameSocket.emit('register_result', {register_result:'0'});
				}
				else {
					db.queryResults("INSERT INTO players(name, password) VALUES($1,$2) RETURNING playerid;", [data['name'], data['password']],							
						function (results)	{				
							if (results.length>0){
								db.queryNoResults("INSERT INTO playerprofiles(playerid, sex, avatar, name, surname, age) VALUES($1,$2,$3,$4,$5,$6);",[
							         results[0].playerid,
							         parseInt(data['playerSex'],10), 
									 "",//avatar
									 data['playerName'],
									 data['playerSurname'],
									 parseInt(data['playerAge'], 10)
								]);
								
								
								db.queryNoResults("INSERT INTO playercontacts(playerid, mobile, email) VALUES($1,$2,$3);",[
 							         results[0].playerid,
 									 data['playerMobile'], 									 
 									 data['playerEmail'] 									 
 								]);
								
								gameSocket.emit('register_result', {register_result:results[0].playerid});
							}
						}
					);
					
					//gameSocket.emit('register_result', {register_result:'0'});
				}
			}
		);	
	
	}
	catch(e)
	{
		console.error(e);
	}
};

/**
 * login in to system
 * @param data
 * @param gameSocket
 */
exports.login = function (data, gameSocket) {
	try {
		db.queryResults('SELECT playerid FROM players WHERE name=$1 AND password=$2;', [data['name'], data['password']],
			function (results)	{
				if (results.length==1) {
					gameSocket.emit('login_result', {login_result:results[0].playerid});					
				}
				else
					gameSocket.emit('login_result', {login_result:0});
					
			}
		);
	}
	catch(e)
	{
		console.error(e);
	}
};

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