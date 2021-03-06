var db;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};

/**
 * register new user if not exist
 * @param data
 * @param gameSocket
 */
exports.register = function (data, gameSocket) {
	try {		
		var playerID;
		db.queryResults('SELECT * FROM players WHERE email=$1 LIMIT 1;', [data.email],
			function (results)	{				
				if (results.length>0){
					gameSocket.emit('register_result', {register_result:'0'});
				}
				else {
					db.queryResults("INSERT INTO players(email, password) VALUES($1,$2) RETURNING playerid;", [data.email, data.password],							
						function (results)	{
							if (results.length>0){
								playerID = results[0].playerid;
							
								db.queryNoResults("INSERT INTO playerprofiles(playerid, sex, avatar, name, surname, age, mobile) VALUES($1,$2,$3,$4,$5,$6,$7);",[
							         results[0].playerid,
							         parseInt(data.profile.sex,10), 
									 "",//avatar
									 data.profile.name,
									 data.profile.surname,
									 parseInt(data.profile.age, 10),
									 data.profile.mobile
								],
								function (){
									/*
									 * add playerdatalogs
									 */
									db.queryNoResults("INSERT INTO playerdatalogs(playerid, registered," +
											"accepted, modified, logged) VALUES($1," +
											"now()," +
											"'01-01-0001 00:00:00'," +
											"'01-01-0001 00:00:00'," +
											"'01-01-0001 00:00:00');",
										[playerID],
										function () {	
											/*
											 * add playerskills
											 */
											db.queryNoResults("INSERT INTO playerskills(playerid, " +
													"strength," +
													"agility, " +
													"speed, " +
													"endurance, " +
													"rest) VALUES($1," +
													"0,0,0,0,0);",
												[playerID],
												function () {	
												/*
												 * add synchronization 
												 * timestamp to synchronize parts of data
												 */
												db.queryNoResults("INSERT INTO synchronize(playerid, profile," +
														"skills, training, badges, achievements, "+
														"market, rank, machine_park, schedule) VALUES($1," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00'," +
														"'01-01-0001 00:00:00');",
													[playerID],
													function () {													
													
													/*
													 * add training
													 * training type, level, endtime and cost
													 */
													db.queryNoResults("INSERT INTO playertraining(playerid, type," +
															"level, endtime, cost) VALUES($1," +
															"0," +
															"0," +
															"null," +										
															"0);",
														[playerID],
														function () {								               
															gameSocket.emit('register_result', {register_result:playerID});
													});
												});
											});
									});									
								});
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
		console.log(data);
		db.queryResults('SELECT playerid FROM players WHERE email=$1 AND password=$2;', [data.email, data.password],
			function (results)	{
				if (results.length==1) {
					gameSocket.emit('login_result', {login_result:results[0].playerid});
					//update logged
					db.queryNoResults('UPDATE playerdatalogs SET logged=now() WHERE playerid=$1;', [results[0].playerid]);
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
