var rp = require('request-promise'),
    Kerberos = require('kerberos').Kerberos,
    kerberos = new Kerberos();

// HTTP call to execute
var options = {
  method: 'GET',
  uri: 'http://mwooldri.marklogic.com:8060/file2.html',
  headers: {},
  json: true//,
  //resolveWithFullResponse: true
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
function request2(options) {
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
      rp(options)
        .then(function (response) {
          console.log('Response: ');
          console.log(response);
        })
        .catch(function (err) {
          console.log('Error: '+err);
        });
      kerberos.authGSSClientClean(ctx, function(err) {
        if (err) {
          throw new Error(""+err);
        }
      });
    });
  });
}


request2(options);
