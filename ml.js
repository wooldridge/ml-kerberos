var config = require('./config'),
    marklogic = require('marklogic'),
    Kerberos = require('kerberos').Kerberos,
    kerberos = new Kerberos();

var db = marklogic.createDatabaseClient({
  host: config.host,
  port: config.port,
  authType: 'kerberos',
  principal: 'test1@MLTEST1.LOCAL'
});

db.setLogger('debug');

db.documents.read(
  '/file.html'
).result( function(documents) {
  console.log('success');
  console.log(JSON.stringify(documents));
}, function(error) {
    console.log('error');
    console.log(JSON.stringify(error, null, 2));
});
