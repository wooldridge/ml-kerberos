var config = {};

config.path = "/PATH/TO/ml-kerberos/"; // include trailing "/"

config.name = "ml-kerberos";
config.host = "HOST";
config.port = 8050;
config.port2 = 8060;


config.auth = {
  user: 'USERNAME',
  pass: 'PASSWORD',
  sendImmediately: false
};

config.appServer = {
  "server-name": config.name + "-http",
  "server-type": "http",
  "group-name": "Default",
  "root": "/",
  "port": config.database.port,
  "content-database": "Documents",
  "modules-database": "Modules",
  "authentication": "kerberos-ticket",
  "internal-security": false,
  "external-security": "EXTERNAL"
}

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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
