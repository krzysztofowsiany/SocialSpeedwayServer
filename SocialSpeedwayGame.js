var io,
	gameSocket,
	playerAuth = require('./PlayerAuth');
	playerProfile = require('./PlayerProfile');
	playerGameProfile = require('./PlayerGameProfile');
	

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
	
	
	//EVENTS
	
	
	//Player Auth events
	gameSocket.on('register', register);
	gameSocket.on('login', login);
	
	//Player Profile events
	gameSocket.on('saveProfile', saveProfile);	
	gameSocket.on('saveContact', saveContact);
	gameSocket.on('getData', getData);
	
	//Player Game Profile like skills, badges, achievements etc.
	gameSocket.on('getSkills', getSkills);	
	gameSocket.on('saveSkills', saveSkills);
	
};



/************************************
 *									* 
 * 		  PLAYER AUTH FUNCTION      *
 * 									*
 ***********************************/

/**
 * Register a new user
 * register
 * @param data
 * */

function register(data) {	
	playerAuth.register(data, gameSocket);	
}


/**
 * Login user into game
 * login
 * @param data
 **/
function login(data) {
	playerAuth.login(data, gameSocket);	
	
}

/*************************************
 *								  	 * 
 *  	PLAYER PROFILE FUNCTION      *
 * 									 *
 ************************************/

/**
 * Profile save
 * saveProfile
 * @param data
 **/
function saveProfile(data) {
	playerProfile.saveProfile(data, gameSocket);	
}

/**
 * Profile contact
 * saveContact
 * @param data
 **/
function saveContact(data) {
	playerProfile.saveContact(data, gameSocket);	
}


/**
 * GetProfile data
 * getData
 * @param data
 **/
function getData(data) {
	playerProfile.getData(data, gameSocket);	
}

/********************************************
 *								  	 		* 
 *  	PLAYER GAME PROFILE FUNCTIONS       *
 * 									 		*
 ********************************************/

/**
 * getSkills
 * @param data
 * **/
function getSkills(data) {
	playerGameProfile.getSkills(data, gameSocket);	
}

/**
 * saveSkills
 * @param data
 * **/
function saveSkills(data) {
	playerGameProfile.saveSkills(data, gameSocket);	
}