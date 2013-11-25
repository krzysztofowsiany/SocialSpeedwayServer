function Register() {
	this.db  = require('./Database.class.js').Database;
	//RegisterDatabase.super_.call(this);
	//Database.apply(this, arguments);
}


Register.prototype.check = function (login) {
	this.db.Query("SELECT * FROM players WHERE name=$1 LIMIT 1;", [login]);	
}

Register.prototype.register = function(login, password) {
	this.db.QueryNoResults("INSERT INTO players(name, password) VALUES($1,$2);", [login, password]);		
    
};


exports.Register = new Register();
