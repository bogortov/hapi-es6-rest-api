//libs
import Joi from 'Joi';
//controllers
import TracksController from '../controllers/TracksController';

function register(server, options, next) {

  server.route([{

    method: 'GET',
    path: '/tracks',
    config: {
      handler: TracksController.getAll,
      tags: ['api'],
      description: 'Get all songs in list',
      notes: 'Some notes here.'
    }
  }]);

  return next();
}

register.attributes = { name: 'routes-tracks', version: '0.0.1' };

export default register;
