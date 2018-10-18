var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');

var conf = {
  email: process.env["GIT_AUTHOR_EMAIL"],
  password: "hunter2",
  server: 'somepass',
  serverPassword: 'hunter2',
};

try {
  var confin = require("./conf");
  Object.assign(conf, confin);
} catch (err) {
  die("Make a conf.js file that defines email, password, server,\n" +
      "and serverPassword in module.exports.");
}

try {
  var m = require('conf.js');
  module.exports.update(m);
} catch (err) {}

var args = process.argv.slice(2);

function die() {
  console.log("ERROR:");
  console.log("----");
  console.log.apply(console.log, arguments);
  console.log("----");
  console.log("Usage:");
  var usage = process.argv.slice(0,2);
  usage.push("<conf.js>");
  usage.push("<dir or filenames>");
  console.log(usage.join(" "));
  console.log("----");
  process.exit(1);
}

function main() {
  if (args.length < 1) {
    die("Not enough arguments.");
  }

  var modules = {};

  for (var i = 0; i < args.length; i++) {
    var fn = args[i];
    var reqname = path.basename(fn, '.js');
    var ext = path.extname(fn);
    var encoding = null;
    console.log("Reading " + fn + " into " + reqname);
    if (ext == '.js') {
      encoding = 'utf8';
    }
    contents = fs.readFileSync(fn, {encoding: encoding});
    if (!encoding) {
      contents = {binary: contents.toString('base64')};
    }
    modules[reqname] = contents;
  }

  var data = {
          branch: conf.branch || "default",         
          modules: modules,
      };

  console.log("Sending:");
  console.log(data);

  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (conf.serverPassword) {
    headers['X-Server-Password'] = conf.serverPassword
  }

  var req = http.request({
      hostname: conf.server,
      path: '/api/user/code',
      port: 21025,
      method: 'POST',
      auth: conf.email + ':' + conf.password,
      headers: headers,
  }, function(resp) {
    resp.setEncoding('utf8');
    var data = '';

    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      die('Screeps server returned error code ' + resp.statusCode);
    }

    resp.on('data', function(chunk) {
      data += chunk;
    });

    resp.on('end', function() {
      try {
        var parsed = JSON.parse(data);
        if (parsed.ok) {
          var msg = 'Committed to ' + conf.server + ' account "' + conf.email + '"';

          if (conf.branch) {
            msg += ' branch "' + conf.branch + '"';
          }
          msg += '.';
          console.log(msg);
        } else {
          die('Error while committig: ', parsed);
        }
      } catch (e) {
        die('Error while processing: ' + e.message);
      }
    });
  });

  req.write(JSON.stringify(data));
  req.end();
}

main();
