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
	gameSocket.on('saveProfile', saveProfile);
	
	gameSocket.on('saveContact', saveContact);
	gameSocket.on('getData', getData);
	
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
 * saveProfile
 * @param data
 **/
function saveProfile(data) {
	player.saveProfile(data, gameSocket);	
	
}

/**
 * Profile contact
 * saveContact
 * @param data
 **/
function saveContact(data) {
	player.saveContact(data, gameSocket);	
}


/**
 * GetProfile data
 * getData
 * @param data
 **/
function getData(data) {
	player.getData(data, gameSocket);	
	
}

