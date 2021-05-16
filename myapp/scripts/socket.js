const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "WebSocket Connection - ID: " , socket.id);

    // welcome current user
    socket.emit('message', "Socket IO setup right!!!");
});
// end of socket.io logic

module.exports = socketapi;