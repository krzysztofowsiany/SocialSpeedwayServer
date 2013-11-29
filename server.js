var
	game=require('./SocialSpeedwayGame');
	io = require('socket.io').listen(8080);

	
//io.set('log level',1);

io.sockets.on('connection', function (socket) {
	//init game
	game.initializeGame(io, socket);
});
