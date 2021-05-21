// make connection
//var io = require('socket.io')();
var socket = io.connect('http://localhost:3000');

// vars to use the id's we need
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var progress = document.getElementById('progress');

// click event
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
	console.log('somethings wrong with button event listener');
}

// typing event
if(message){
	message.addEventListener('keypress', function(){
		socket.emit('typing', handle.value);
	});	
}
else{
	console.log('somethings wrong with typing event listener');
}


// push content to client once events are activated
socket.on('chat', function(data){
	progress.innerHTML="";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    progress.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

$("#forum").click(function() {
	console.log("clicked");
	window.location="/#forumIndex";
});