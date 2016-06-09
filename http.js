var Kerberos = require('kerberos').Kerberos;
var kerberos = new Kerberos();
var http = require('http');

function httpget(opts, callback) {
  console.log('submitting to '+(opts.hostname||opts.host)+' with authorization header: '+(opts.headers||{}).authorization);
  var req = http.get(opts, function(res) {
    if (res.statusCode == 401) {
      console.log('response headers: ');
      console.log(res.headers);
      submitWithAuthorization(req, opts, callback);
      return;
    }
    callback(res);
  });
  return req;
}

function submitWithAuthorization(oldreq, opts, callback) {
  kerberos.authGSSClientInit("HTTP@"+(opts.hostname || opts.host), 0, function(err, ctx) {
    if (err) {
      throw new Error(""+err);
    }
    console.log('done init '+ctx);
    kerberos.authGSSClientStep(ctx, "", function (err) {
      if (err) {
        throw new Error(""+err);
      }
      console.log('done step '+ctx);
      var headers = opts.headers || {};
      headers.authorization = "Negotiate "+ctx.response;
      opts.headers = headers;
      var newreq = httpget(opts, callback);

      // tell oldReq "owner" about newReq. resubmit is an "unofficial" event
      oldreq.emit('resubmit', newreq);
      kerberos.authGSSClientClean(ctx, function(err) {
        if (err) {
          throw new Error(""+err);
        }
      });
    });
  });
}

// //////////////////////////////////////////////////////////////////

var options = {
    hostname : "mwooldri.marklogic.com",
    port : 8060,
    path : "/file.html"
};

var req = httpget(options, function(res) {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    console.log("BODY: "+body);
  });
});

req.on('resubmit', function(newreq) {
  console.log('request resubmitted');
  req = newreq;
});

return;
