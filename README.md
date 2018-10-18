Screeps code as we learn the engine!

Added push.js (needs any version of node on your machine). Usage:

1) Create a password on screeps server, following:

      https://www.npmjs.com/package/screepsmod-auth

   Recommend: Console or URI.

2) Create a file, conf.js, in root git checkout directory, that looks like

    module.exports = {
      email: 'myemail@foo.com',
      password: '<the password you set in step 1>',
      server: <host>,
      serverPassword: <server global password>,
    }

3) node push.js path/*.js
