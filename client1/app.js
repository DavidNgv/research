var faye = require('faye');

var client = new faye.Client('http://localhost:8000/faye');

var subscription1 = client.subscribe('/vbackend1', function(message){
	console.log(message);
});

subscription1.then(function() {
  console.log('Subscription is now active!');
});




