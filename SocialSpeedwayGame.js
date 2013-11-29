var io,
	gameSocket,
	player = require('./Player');
	;

/***
 * Initialize game server
 * 
 * @param sio
 * @param socket
 */

exports.initializeGame = function (sio, socket) {
	io = sio;
	gameSocket = socket;
	
	gameSocket.emit('connected', {result:"ok"});
	
	
	//Events
	
	
	
	
	//Player events
	gameSocket.on('register', register);
	gameSocket.on('login', login);
	gameSocket.on('save_profile', save_profile);
	
};



/************************************
 *									* 
 * 		  PLAYER FUNCTIONS			*
 * 									*
 ***********************************/

/**
 * Register a new user
 * register
 * @param data
 * */

function register(data) {	
	player.register(data, gameSocket);	
	
}



/**
 * Login user into game
 * login
 * @param data
 **/
function login(data) {
	player.login(data, gameSocket);	
	
}


/**
 * Profile save
 * save_profile
 * @param data
 **/
function save_profile(data) {
	player.save_profile(data, gameSocket);	
	
}




