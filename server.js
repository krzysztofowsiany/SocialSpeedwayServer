
var reg = require('./Register.class.js').Register;
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
 
 socket.on('register', function (data) {	
	console.log(data);
	//reg.Register.register(data['login'], data['password']);
	//console.log(data);
	//reg.register(data['login'], data['password']);
	reg.check(data['login']);
	socket.emit('register_result', 
	{ 
		result: 'ok' 
	});
  });
});
