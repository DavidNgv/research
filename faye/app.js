var http = require('http'),
    faye = require('faye');

var server = http.createServer(),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.on('publish', function(clientId, channel, data) {
    console.log('on publish', clientId, channel, data);
})

bayeux.getClient().publish('/vbackend1', {
    text:       'Message from bayeux'
});

bayeux.attach(server);
server.listen(8000);