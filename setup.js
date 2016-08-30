var config = require('./config'),
    rp = require('request-promise'),
    fs = require('fs');

function createAppServer() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/servers',
    body: config.appServer,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('HTTP app server created at port: ' + config.port);
      loadData();
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

var dataPath = config.path + 'docs/'
    dataFiles = fs.readdirSync(dataPath),
    count = 0;

function loadData() {
  var currFile = dataFiles.shift();
  count++;
  var buffer;
  buffer = fs.readFileSync(dataPath + currFile);

  var options = {
    method: 'PUT',
    uri: 'http://' + config.host + ':8000/v1/documents?database=Documents&uri=/' + currFile,
    body: buffer,
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Document loaded: ' + currFile);
      if (dataFiles.length > 0) {
        loadData();
      } else {
        console.log('Data loaded');
      }
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

function start() {
  createAppServer();
}

start();
