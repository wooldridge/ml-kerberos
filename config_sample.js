var pjson = require('./package.json');
var path = require('path');

var config = {};

config.path = path.dirname(require.main.filename) + "/";

config.name = "ml-kerberos";
config.host = "HOST";
config.port = 8050;


config.auth = {
  user: 'USERNAME',
  pass: 'PASSWORD',
  sendImmediately: false
};

config.databaseSetup = {
  "database-name": config.name
};

config.forestSetup = {
  "forest-name": config.name + '-1',
  "database": config.name
}

config.restSetup = {
  "rest-api": {
    "name": config.name + "-rest",
    "database": config.name,
    "modules-database": config.name + "-modules",
    "port": config.port,
    "error-format": "json"
  }
}

config.extSecSetup = {
  "external-security-name": "mykerberos",
  "authentication": "kerberos",
  "authorization": "internal",
  "ssl-require-client-certificate": false
}

config.userSetup = {
  "user-name": "user1",
  "password": "user1",
  "external-names": {
    "external-name": "EXTNAME"
  },
  "roles": {
    "role": "rest-reader"
  }
}

config.restUpdate = {
  "authentication": "kerberos-ticket",
  "internal-security": false,
  "external-security": [config.extSecSetup['external-security-name']]
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
