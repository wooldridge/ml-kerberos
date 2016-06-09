var config = {};

config.path = "/PATH/TO/ml-kerberos/"; // include trailing "/"

config.name = "ml-kerberos";
config.host = "HOST";
config.port = 8060;

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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
