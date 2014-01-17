var pg = require('pg'),
	dbUrl = 'pg://socialspeedway:kolos7@localhost:5432/socialspeedway',
	client;
	
exports.init = function(){
	//client = new pg.Client(dbUrl);
	//client.connect();	
};

exports.queryNoResults = function(query, params) {	
	pg.connect(dbUrl,	
		function(err, client, done) {
		q= client.query(query, params);     
		q.on('error', function(error) {
		    console.log(error);
		  }); 
		q.on("end", function (result) {			
			client.end();			
		});
			
	});

};
	
exports.queryResults = function(query, params, results) {
	var client = new pg.Client(dbUrl);
	client.connect(function(err) {
		if (err) return console.error('could not connect to posgres', err);
				
		client.query(query, params, function(err, result) {
			if(err) return console.error('error ruing query', err);		
			
			results(result.rows);
			
			client.end();			
		});
	});

	
	
	/*
	var resultMethod = results;
	pg.connect(dbUrl,	
			function(err, client, done) {
				q= client.query(query, params);
				q.on('error', function(error) {
				    console.log(error);
				  });       
				
				q.on("row", function (row, result){		
					result.addRow(row);		
				});	
				
				q.on("end", function (result) {		
					//console.log(result.rows.length);
					client.end();
					results(result.rows);
				});
			});
	*/
	/*q = client.query(query, params);
	
	q.on('error', function(error) {
	    console.log(error);
	  });       
	
	q.on("row", function (row, result){		
		result.addRow(row);		
	});	
	
	q.on("end", function (result) {		
		//console.log(result.rows.length);
		client.end();
		results(result.rows);
	})*/;	
};
	

/*

var pg = require('pg'),
	dbUrl = 'pg://socialspeedway:kolos7@localhost:5432/socialspeedway',
	client;
	
exports.init = function(){
	client = new pg.Client(dbUrl);
	client.connect();	
};

exports.queryNoResults = function(query, params) {	
	pg.connect(dbUrl,	
		function(err, client, done) {
			client.query(query, params);            
		});
	
	//q = client.query(query, params);
	
	//q.on('error', function(error) {
	//    console.log(error);
	//  });       
	
	q.on("end", function (result) {		
		//console.log(result.rows.length);
		client.end();
		//results(result.rows);
	});
	
	//pg.connect(dbUrl,	
//		function(err, client, done) {
	//		client.query(query, params);            
		//	});
};
	
exports.queryResults = function(query, params, results) {
	q = client.query(query, params);
	
	q.on('error', function(error) {
	    console.log(error);
	  });       
	
	q.on("row", function (row, result){		
		result.addRow(row);		
	});	
	
	q.on("end", function (result) {		
		//console.log(result.rows.length);
		client.end();
		results(result.rows);
	});	
};
	

function getResult(err, client, done) {			
	client.query(query, params, getRow);
	if(err) {
		return console.error('error fetching client from pool', err);
	}
	
}


function getRow(err, res) {
	if(err) 
		results = err;
	else {
		results = res;
		
	}			
	
	queryResult(results);
	pg.close();
	
}
	
	
	*/
