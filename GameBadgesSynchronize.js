var currentArray;
var date;
var socket;
var db;

exports.setDB = function(databaseHandler) {
	db = databaseHandler;
};

function updateSyncData(playerid, data) {
	try {
		db.queryNoResults(
				'UPDATE synchronize SET badges=$2 WHERE playerid=$1;', [
						playerid,
						new Date(data
								- (new Date().getTimezoneOffset() * 60 * 1000))
								.toUTCString() ]);
	} catch (e) {
		console.error(e);
	}
}

/**
 * grantBadges
 * 
 * @param achievementID
 * @param playerID
 */

function grantBadge(gameSocket, arrayIndex, playerID) {
	try {
		db
				.queryResults(
						'INSERT INTO badgestoplayer (playerid, badgeid, granted) VALUES($1,$2, $3);',
						[
								playerID,
								currentArray[arrayIndex].id,
								new Date(
										date
												- (new Date()
														.getTimezoneOffset() * 60 * 1000))
										.toUTCString() ], function(results) {
							console.log("ADD");
							findBadge(gameSocket, arrayIndex + 1, playerID);
						});
	} catch (e) {
		console.error(e);
	}
}

/**
 * findBadge
 * 
 * @param badgeID
 * @param playerID
 */
function findBadge(gameSocket, arrayIndex, playerID) {
	try {
		if (arrayIndex < currentArray.length) {
			db
					.queryResults(
							'SELECT * FROM badgestoplayer WHERE playerid=$1 AND badgeid=$2;',
							[ playerID, currentArray[arrayIndex].id ],
							function(results) {
								// if not found add achievement
								if (results.length == 0) {
									grantBadge(gameSocket, arrayIndex, playerID);
								} else
									// next if array size is less
									findBadge(gameSocket, arrayIndex + 1,
											playerID);

							});

		} else {
			gameSocket.emit('saveBadgesResult', {
				result : 1
			});
			updateSyncData(playerID, date);
		}
	} catch (e) {
		console.error(e);
	}
}

/**
 * setData
 * 
 * @param data
 * @param gameSocket
 */
exports.setData = function(data, gameSocket) {
	try {
		if (data != undefined) {
			currentArray = data.badges;
			console.log("GameBadgesSynchronization:setData");
			socket = gameSocket;
			date = data.date;

			findBadge(gameSocket, 0, data.playerID);
		}
	} catch (e) {
		console.error(e);
	}
};

/*******************************************************************************
 * GET DATA METHOD
 */

/**
 * resultBadgeData
 * 
 * @param gameSocket
 * @param badgess
 * @param playerID
 */

function resultBadgeData(gameSocket, badges, playerID) {
	try {
		db.queryResults('SELECT badges FROM synchronize WHERE playerid=$1;',
				[ playerID ], function(results) {
					gameSocket.emit('syncBadgesResultData', {
						'date' : results[0],
						'badges' : badges
					});
				});

	} catch (e) {
		console.error(e);
	}
}

/**
 * getData
 * 
 * @param data
 * @param gameSocket
 */
exports.getData = function(data, gameSocket) {
	try {
		console.log("GameBadgesSynchronization:getData");
		db.queryResults(
				'SELECT badgeid AS id FROM badgestoplayer WHERE playerid=$1;',
				[ data.playerID ], function(results) {
					// result data
					console.log(results);
					// get sync data
					resultBadgeData(gameSocket, results, data.playerID);

				});

	} catch (e)

	{
		console.error(e);
	}
};

/**
 * getBadgesList
 * 
 * @param data
 * @param gameSocket
 */
exports.getBadgesList = function(data, gameSocket) {
	try {
		console.log("GameBadgesSynchronization:getBadgesList");
		db
				.queryResults(
						'SELECT ba.badgeid AS ba_id, ba.name AS ba_name, ba.description AS ba_description, ba.file AS ba_file,'
								+ 'bag.name AS bag_name, '
								+ 'b.name AS b_name, b.value AS b_value,'
								+ 'bt.name AS bt_name'
								+ ' FROM badges ba'
								+ ' LEFT JOIN badgegroups bag ON ba.badgegroupid=bag.badgegroupid'
								+ ' LEFT JOIN bonus b ON ba.bonusid=b.bonusid'
								+ ' LEFT JOIN bonustype bt ON b.bonustypeid = bt.bonustypeid;',
						[], function(results) {
							// result data
							console.log(results);
							// get sync data
							gameSocket.emit('badgesList', results);
						});

	} catch (e) {
		console.error(e);
	}
};
