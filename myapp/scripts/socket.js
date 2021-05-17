const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "Made WebSocket Connection - ID: " , socket.id);

    // welcome current user
    socket.on('chat',function(data){
        io.emit('chat', data);
    });
});
// end of socket.io logic

module.exports = socketapi;