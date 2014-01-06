var io,
	gameSocket,
	playerAuth = require('./PlayerAuth');
	synchronize = require('./Synchronize');
	synchProfile = require('./GameProfileSynchronize');
	synchSkills = require('./GameSkillsSynchronize');
	//synchTraining = require('./GameTrainingSynchronize');
	//synchBadges = require('./GameBadgesSynchronize');
	//synchAchievements = require('./GameAchievementsSynchronize');
	
	

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
	
	//Synchronize
	gameSocket.on('checkSynch', checkSynch);
		
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
 *  	    SYNCHRONIZATION          *
 * 									 *
 ************************************/

/**
 * checkSynch
 * checkSynch
 * @param data
 **/
function checkSynch(data) {	
	synchronize.check(data, gameSocket);	
}

/*************************************
 *  	PROFILE SYNCHRONIZATION      *
 ************************************/

/**
 * Profile setData
 * profileSetData
 * @param data
 **/
function profileSetData(data) {
	synchProfile.setData(data, gameSocket);	
}

/**
 * Profile getData
 * profileGetData
 * @param data
 **/
function profileGetData(data) {
	synchProfile.getData(data, gameSocket);	
}

/*************************************
 *  	SKILLS SYNCHRONIZATION       *
 ************************************/
/**
 * Skills setData
 * skillsSetData
 * @param data
 **/
function skillsSetData(data) {
	synchSkills.setData(data, gameSocket);	
}

/**
 * Skills getData
 * skillsGetData
 * @param data
 **/
function skillsGetData(data) {
	synchSkills.getData(data, gameSocket);	
}


/*************************************
 *     TRAINING SYNCHRONIZATION      *
 ************************************/
/**
 * Training setData
 * trainingSetData
 * @param data
 **/
function trainingSetData(data) {
	synchTraining.setData(data, gameSocket);	
}

/**
 * Training getData
 * trainingGetData
 * @param data
 **/
function trainingGetData(data) {
	synchTraining.getData(data, gameSocket);	
}


/*************************************
 *  	BADGES SYNCHRONIZATION       *
 ************************************/
/**
 * Badges setData
 * badgesSetData
 * @param data
 **/
function badgesSetData(data) {
	synchBadges.setData(data, gameSocket);	
}

/**
 * Badges getData
 * badgesGetData
 * @param data
 **/
function badgesGetData(data) {
	synchBadges.getData(data, gameSocket);	
}

/*************************************
 *    ACHIEVEMENTS SYNCHRONIZATION   *
 ************************************/
/**
 * Achievements setData
 * achievementsSetData
 * @param data
 **/
function achievementsSetData(data) {
	synchAchievements.setData(data, gameSocket);	
}

/**
 * Achievements getData
 * achievementsGetData
 * @param data
 **/
function achievementsGetData(data) {
	synchAchievements.getData(data, gameSocket);	
}