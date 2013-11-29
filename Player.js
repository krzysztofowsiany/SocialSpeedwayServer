var db  = require('./Database');

/**
 * register new user if not exist
 * @param data
 * @param gameSocket
 */
exports.register = function (data, gameSocket) {
	db.queryResults('SELECT * FROM players WHERE name=$1 LIMIT 1;', [data['name']],
			function (results)	{
				console.log(results.length);
				if (results.length>0){
					gameSocket.emit('register_result', {register_result:'0'});
				}
				else {
					db.queryNoResults("INSERT INTO players(name, password) VALUES($1,$2);", [data['name'], data['password']]);
					gameSocket.emit('register_result', {register_result:'1'});
				}
			});	
};

/**
 * login in to system
 * @param data
 * @param gameSocket
 */
exports.login = function (data, gameSocket) {
	db.queryResults('SELECT * FROM players WHERE name=$1 AND password=$2;', [data['name'], data['password']],
			function (results)	{
					gameSocket.emit('login_result', {login_result:results.length});
				
			});	
};

/**
 * save profile
 * @param data
 * @param gameSocket
 */
exports.save_profile = function (data, gameSocket) {
	console.log(data);
	//db.queryResults('SELECT * FROM players WHERE name=$1 AND password=$2;', [data['name'], data['password']],
		//	function (results)	{
			//		gameSocket.emit('profile_result', {login_result:results.length});
				
			//});	
};