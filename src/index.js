//libs
import http from 'http';
import Hapi from 'hapi';
import good from 'good';
import goodConsole from 'good-console';
import IncRoutes from './IncRoutes';
import bodyParser from 'body-parser';

import routes from './routes/index.js';

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
    log: false,
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

//adding logging
plugins.push({
  register: good,
  options: {
    opsInterval: 5000,
    reporters: [{
      reporter: goodConsole,
      events: {
        "log": [
          "error",
          "info"
        ],
        "request": [
          "error",
          "info"
        ]
      }
    }]
  }
});

plugins.push({
  register: IncRoutes.Tracks
});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  // Prevent the server from being started when using it as a module
  // (i.e. while unit testing)
  if (!module.parent) {
    // start hapi server
    server.start((err) => {
      if (err) {
        throw err;
      }
      server.log(['info'], 'API server running at: ' + server.info.uri);
    });
  }

});

// export default server;
