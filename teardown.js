var config = require('./config'),
    rp = require('request-promise');

function handleError(err) {
  if (err.error &&
      err.error.errorResponse &&
      err.error.errorResponse.message) {
    console.log('Error: ' + err.error.errorResponse.message);
  } else {
    console.log(JSON.stringify(err, null, 2));
  }
}

function deleteAppServer() {
  var options = {
    method: 'DELETE',
    uri: 'http://' + config.host + ':8002/manage/v2/servers/' + config.appServer['server-name'] +
         '?group-id=Default',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('HTTP app server deleted: ' + config.appServer['server-name']);
    })
    .catch(function (err) {
      handleError(err)
    });
}

function start() {
  deleteAppServer();
}

start();
