var rp = require('request-promise'),
    Kerberos = require('kerberos').Kerberos,
    kerberos = new Kerberos();

// HTTP call to execute
var options = {
  method: 'GET',
  uri: 'http://mwooldri.marklogic.com:8060/file.html',
  headers: {},
  json: true,
  resolveWithFullResponse: true
};

// Utility method for exposing object properties
function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      //if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      //}
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

// Perform an HTTP request
function request(options) {
  console.log('Getting ' + options.uri + ' with authorization header: ' + options.headers.authorization);
  rp(options)
    .then(function (response) {
      console.log('Response: ');
      console.log(response);
    })
    .catch(function (err) {
      console.log('Error statusCode: '+err.statusCode);
      console.log('Header www-authenticate: '+err.response.headers['www-authenticate']);
      if (err.statusCode === 401) {
        kerberos.authGSSClientInit("HTTP@"+"mwooldri.marklogic.com", 0, function(err, ctx) {
          if (err) {
            throw new Error(""+err);
          }
          console.log('Finished init '+ctx);
          console.log(getMethods(ctx).join("\n"));
          console.log(typeof ctx);
          kerberos.authGSSClientStep(ctx, "", function (err) {
            if (err) {
              throw new Error(""+err);
            }
            console.log(getMethods(ctx).join("\n"));
            console.log('Finished step '+ctx);
            var headers = options.headers || {};
            headers['authorization'] = "Negotiate "+ctx.response;
            options.headers = headers;
            request(options);
            kerberos.authGSSClientClean(ctx, function(err) {
              if (err) {
                throw new Error(""+err);
              }
            });
          });
        });
      }
    });
}

request(options);
