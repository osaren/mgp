const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on( "connection", function( socket ) {
    console.log( "Made WebSocket Connection - ID: " , socket.id);

    // 2 socket functions that are linked from server to all clients(users)
    socket.on('chat',function(data){
        io.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});

module.exports = socketapi;