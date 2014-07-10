var io, gameSocket, db = require('./Database'),

playerAuth = require('./PlayerAuth'), 
synchronize = require('./Synchronize'), 
syncProfile = require('./GameProfileSynchronize'), 
syncSkills = require('./GameSkillsSynchronize'), 
syncTraining = require('./GameTrainingSynchronize'), 
syncBadges = require('./GameBadgesSynchronize'), 
syncAchievements = require('./GameAchievementsSynchronize'),

syncMarket = require('./GameMarketSynchronize'),
syncRank = require('./GameRankSynchronize'),
syncMachinePark = require('./GameMachineParkSynchronize'),
syncSchedulePark = require('./GameScheduleSynchronize')

;

/**
 * Send database handler to synch class setDB
 */
function setDB() {
	db.init();
	playerAuth.setDB(db);
	synchronize.setDB(db);
	syncProfile.setDB(db);
	syncSkills.setDB(db);
	syncTraining.setDB(db);
	syncBadges.setDB(db);
	syncAchievements.setDB(db);
	
	syncMarket.setDB(db);
	syncRank.setDB(db);
	syncMachinePark.setDB(db);
	syncSchedule.setDB(db);
}

/*******************************************************************************
 * Initialize game server
 * 
 * @param sio
 * @param socket
 */

exports.initializeGame = function(sio, socket) {
	io = sio;
	gameSocket = socket;

	setDB();
	
	syncMarket.setEvents(gameSocket);

	gameSocket.emit('connected', {
		result : "ok"
	});

	// EVENTS

	// Auth events
	gameSocket.on('register', register);
	gameSocket.on('login', login);

	// syncronize
	gameSocket.on('checkSynch', checkSynch);

	// Profile
	gameSocket.on('profileSetData', profileSetData);
	gameSocket.on('profileGetData', profileGetData);

	// Skills
	gameSocket.on('skillsSetData', skillsSetData);
	gameSocket.on('skillsGetData', skillsGetData);

	// Training
	gameSocket.on('trainingSetData', trainingSetData);
	gameSocket.on('trainingGetData', trainingGetData);

	// Badges
	gameSocket.on('badgesSetData', badgesSetData);
	gameSocket.on('badgesGetData', badgesGetData);
	gameSocket.on('getBadgesList', getBadgesList);

	// Achievements
	gameSocket.on('achievementsSetData', achievementsSetData);
	gameSocket.on('achievementsGetData', achievementsGetData);
	gameSocket.on('getAchievementsList', getAchievementsList);
};

/*******************************************************************************
 * * PLAYER AUTH FUNCTION * *
 ******************************************************************************/

/**
 * Register a new user register
 * 
 * @param data
 */

function register(data) {
	playerAuth.register(data, gameSocket);
}

/**
 * Login user into game login
 * 
 * @param data
 */
function login(data) {
	playerAuth.login(data, gameSocket);
}

/*******************************************************************************
 * * syncRONIZATION * *
 ******************************************************************************/

/**
 * checksync checksync
 * 
 * @param data
 */
function checkSynch(data) {
	synchronize.check(data, gameSocket);
}

/*******************************************************************************
 * PROFILE syncRONIZATION *
 ******************************************************************************/

/**
 * Profile setData profileSetData
 * 
 * @param data
 */
function profileSetData(data) {
	syncProfile.setData(data, gameSocket);
}

/**
 * Profile getData profileGetData
 * 
 * @param data
 */
function profileGetData(data) {
	syncProfile.getData(data, gameSocket);
}

/*******************************************************************************
 * SKILLS syncRONIZATION *
 ******************************************************************************/
/**
 * Skills setData skillsSetData
 * 
 * @param data
 */
function skillsSetData(data) {
	syncSkills.setData(data, gameSocket);
}

/**
 * Skills getData skillsGetData
 * 
 * @param data
 */
function skillsGetData(data) {
	syncSkills.getData(data, gameSocket);
}

/*******************************************************************************
 * TRAINING syncRONIZATION *
 ******************************************************************************/
/**
 * Training setData trainingSetData
 * 
 * @param data
 */
function trainingSetData(data) {
	syncTraining.setData(data, gameSocket);
}

/**
 * Training getData trainingGetData
 * 
 * @param data
 */
function trainingGetData(data) {
	syncTraining.getData(data, gameSocket);
}

/*******************************************************************************
 * BADGES syncRONIZATION *
 ******************************************************************************/
/**
 * Badges setData badgesSetData
 * 
 * @param data
 */
function badgesSetData(data) {
	syncBadges.setData(data, gameSocket);
}

/**
 * Badges getData badgesGetData
 * 
 * @param data
 */
function badgesGetData(data) {
	syncBadges.getData(data, gameSocket);
}

/**
 * Get badgess list getBadgesList
 * 
 * @param data
 */
function getBadgesList(data) {
	syncBadges.getBadgesList(data, gameSocket);
}

/*******************************************************************************
 * ACHIEVEMENTS syncRONIZATION *
 ******************************************************************************/
/**
 * Achievements setData achievementsSetData
 * 
 * @param data
 */
function achievementsSetData(data) {
	console.log(data);
	syncAchievements.setData(data, gameSocket);
}

/**
 * Achievements getData achievementsGetData
 * 
 * @param data
 */
function achievementsGetData(data) {
	console.log(data);
	syncAchievements.getData(data, gameSocket);
}

/**
 * Get achievements list getAchievementsList
 * 
 * @param data
 */
function getAchievementsList(data) {
	syncAchievements.getAchievementsList(data, gameSocket);
}
