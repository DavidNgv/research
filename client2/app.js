var faye = require('faye');

var client = new faye.Client('http://localhost:8000/faye');

var publication = client.publish('/vbackend1', {text: 'Hi there'});

publication.then(function() {
  console.log('Message received by server!');
}, function(error) {
  console.log('There was a problem: ' + error.message);
});


