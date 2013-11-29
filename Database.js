var pg = require('pg'),
	dbUrl = 'pg://socialspeedway:kolos7@localhost:5432/socialspeedway',
	client;
	
	

exports.queryNoResults = function(query, params) {
	pg.connect(dbUrl,	
		function(err, client, done) {
			client.query(query, params);            
			});
};
	
exports.queryResults = function(query, params, results) {
	
	client = new pg.Client(dbUrl);
	client.connect();
	
	var q = client.query(query, params);
	
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
	
function aaa(result)
{

}

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
	
