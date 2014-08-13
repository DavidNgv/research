// This script demonstrates a logger for the chat app. First, start the chat
// server in one terminal then run this in another:
//
//   $ node examples/node/server.js
//   $ node examples/node/client.js
//
// The client connects to the chat server and logs all messages sent by all
// connected users.

var faye = require('faye'),

    port     = process.argv[2] || 8000,
    path     = process.argv[3] || 'bayeux',
    scheme   = process.argv[4] === 'ssl' ? 'https' : 'http',
    endpoint = scheme + '://localhost:' + port + '/' + path;

console.log('Connecting to ' + endpoint);
var client = new faye.Client(endpoint);

var subscription = client.subscribe('/chat/*', function(message) {
  var user = message.user;

  var publication = client.publish('/members/' + user, {
    user:     'node-logger',
    message:  ' Got your message, ' + user + '!'
  });
  publication.callback(function() {
    console.log('[PUBLISH SUCCEEDED]');
  });
  publication.errback(function(error) {
    console.log('[PUBLISH FAILED]', error);
  });
});

subscription.callback(function() {
  console.log('[SUBSCRIBE SUCCEEDED]');
});
subscription.errback(function(error) {
  console.log('[SUBSCRIBE FAILED]', error);
});

client.bind('transport:down', function() {
  console.log('[CONNECTION DOWN]');
});
client.bind('transport:up', function() {
  console.log('[CONNECTION UP]');
});
