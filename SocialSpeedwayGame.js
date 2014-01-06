var io,
	gameSocket,
	playerAuth = require('./PlayerAuth');
	syncronize = require('./Synchronize');
	syncProfile = require('./GameProfileSynchronize');
	syncSkills = require('./GameSkillsSynchronize');
	syncTraining = require('./GameTrainingSynchronize');
	syncBadges = require('./GameBadgessyncronize');
	syncAchievements = require('./GameAchievementsSynchronize');
	
	

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
	
	//Auth events
	gameSocket.on('register', register);
	gameSocket.on('login', login);
	
	//syncronize
	gameSocket.on('checksync', checksync);
		
	//Profile
	gameSocket.on('profileSetData', profileSetData);	
	gameSocket.on('profileGetData', profileGetData);
		
	//Skills
	gameSocket.on('skillsSetSkills', skillsSetData);	
	gameSocket.on('skillsGetSkills', skillsGetData);
	
	//Training
	gameSocket.on('trainingSetSkills', trainingSetData);	
	gameSocket.on('trainingGetSkills', trainingGetData);
	
	//Badges
	gameSocket.on('badgesSetSkills', badgesSetData);	
	gameSocket.on('badgesGetSkills', badgesGetData);
	
	//Achievements
	gameSocket.on('achievementsSetSkills', achievementsSetData);	
	gameSocket.on('achievementsGetSkills', achievementsGetData);
};


/************************************
 *									* 
 * 		PLAYER AUTH FUNCTION        *
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
 *  	    syncRONIZATION          *
 * 									 *
 ************************************/

/**
 * checksync
 * checksync
 * @param data
 **/
function checksync(data) {	
	syncronize.check(data, gameSocket);	
}

/*************************************
 *  	PROFILE syncRONIZATION      *
 ************************************/

/**
 * Profile setData
 * profileSetData
 * @param data
 **/
function profileSetData(data) {
	syncProfile.setData(data, gameSocket);	
}

/**
 * Profile getData
 * profileGetData
 * @param data
 **/
function profileGetData(data) {
	syncProfile.getData(data, gameSocket);	
}

/*************************************
 *  	SKILLS syncRONIZATION       *
 ************************************/
/**
 * Skills setData
 * skillsSetData
 * @param data
 **/
function skillsSetData(data) {
	syncSkills.setData(data, gameSocket);	
}

/**
 * Skills getData
 * skillsGetData
 * @param data
 **/
function skillsGetData(data) {
	syncSkills.getData(data, gameSocket);	
}


/*************************************
 *     TRAINING syncRONIZATION      *
 ************************************/
/**
 * Training setData
 * trainingSetData
 * @param data
 **/
function trainingSetData(data) {
	syncTraining.setData(data, gameSocket);	
}

/**
 * Training getData
 * trainingGetData
 * @param data
 **/
function trainingGetData(data) {
	syncTraining.getData(data, gameSocket);	
}


/*************************************
 *  	BADGES syncRONIZATION       *
 ************************************/
/**
 * Badges setData
 * badgesSetData
 * @param data
 **/
function badgesSetData(data) {
	syncBadges.setData(data, gameSocket);	
}

/**
 * Badges getData
 * badgesGetData
 * @param data
 **/
function badgesGetData(data) {
	syncBadges.getData(data, gameSocket);	
}

/*************************************
 *    ACHIEVEMENTS syncRONIZATION   *
 ************************************/
/**
 * Achievements setData
 * achievementsSetData
 * @param data
 **/
function achievementsSetData(data) {
	syncAchievements.setData(data, gameSocket);	
}

/**
 * Achievements getData
 * achievementsGetData
 * @param data
 **/
function achievementsGetData(data) {
	syncAchievements.getData(data, gameSocket);	
}