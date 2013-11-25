function Database()
{
	var this_=this;
	this.pg = require('pg');
	this.dbUrl = 'postgres://socialspeedway:kolos7@localhost:5432/socialspeedway';	
	this.results;
}


Database.prototype.QueryNoResults = function(query, params) {
	this.pg.connect(this.dbUrl,	
		function(err, client, done) {
			client.query(query, params);            
			});
};


Database.prototype.setResult = function(a) {	
	console.log('ok');
}


Database.prototype.getRow = function(err, res) {
	//if(err) 
	//	r = err;
	//else {
	//	r = res;						
	//}
					
	//this.setResult(r);
}
			
Database.prototype.getResult = function(err, client, done) {	
	console.log('asdf');
	console.log(this_.query);
	console.log('asdf');
	
	client.query(this.query, this.params, this.getRow);
	//if(err) {
		//		return console.error('error fetching client from pool', err);
		//	}
		//	
		
	
};		

Database.prototype.Query = function(query, params) {	
	this.params = params;
	this.query = query;
	this.pg.connect(this.dbUrl,	this.getResult);		
	
};


exports.Database = new Database();


