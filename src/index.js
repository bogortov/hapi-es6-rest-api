//libs
import http from 'http';
import Hapi from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import GoodSqueeze from 'good-squeeze';
import bodyParser from 'body-parser';

import Tracks from './routes/Tracks.js';

import './db';

const server = module.exports = new Hapi.Server({
  debug: {
    "log": [
      "error",
      "info"
    ],
    "request": [
      "error",
      "info"
    ]
  }
});

//hapi server creation
server.connection({
  host: 'localhost',
  port: process.env.PORT || 8080,
  routes: {
    log: true,
    cors: {
      origin: ['*'],
      credentials: true
    },
    state: {
      parse: true, // parse and store in request.state
      failAction: 'ignore' // may also be 'ignore' or 'log'
    }
  }
});

let plugins = [];

//adding routes
plugins.push({
  register: Tracks
});

server.register(plugins);

server.register({
  register: Good,
  options: {
    opsInterval: 5000,
    reporters: [{
      reporter: GoodConsole,
      events: {
        "log": [
          "error",
          "info"
        ],
        "request": [
          "error",
          "info"
        ],
        "response": [
          "error",
          "info"
        ]
      }
    }]
  }
}, (err) => {

  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start((err) => {

    if (err) {
      throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
