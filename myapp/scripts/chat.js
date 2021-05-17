// make connection
var socket = io.connect('http://localhost:3000/#test');

// query dom
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');

// emit events
if(button){
	button.addEventListener('click', function(){
		socket.emit('chat', {
			message: message.value,
			handle: handle.value
		});
		console.log('sent message');
	});
}
else{
	console.log('somethings wrong with event listener');
}

// Listen for event
socket.on('chat', function(data){
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});