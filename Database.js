var pg = require('pg'),
	dbUrl = 'pg://socialspeedway:kolos7@localhost:5432/socialspeedway',
	client;
	
exports.init = function(){
	//client = new pg.Client(dbUrl);
	//client.connect();	
};

exports.queryNoResults = function(query, params, onEnd) {	
	var client = new pg.Client(dbUrl);
	client.connect(function(err) {
		if (err) return console.error('could not connect to posgres', err);				
		client.query(query, params, function(err, result) {
			if(err) return console.error('error ruing query', err);
			client.end();
			if (onEnd != undefined)
				onEnd();
		});
	});
};
	
exports.queryResults = function(query, params, onResult) {
	var client = new pg.Client(dbUrl);
	client.connect(function(err) {
		if (err) return console.error('could not connect to posgres', err);
				
		client.query(query, params, function(err, result) {
			if(err) return console.error('error ruing query', err);		
			client.end();
			if (onResult != undefined)
				onResult(result.rows);
		});
	});
};
	

