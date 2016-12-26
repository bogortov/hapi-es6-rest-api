import Track from '../models/Track';

export default {

  getAll(request, reply) {

      const { limit = 50, skip = 0 } = request.query;

      Track.find({ limit, skip })
        .then(tracks => reply(tracks))
        .catch(e => reply(e));
    },

    getById(request, reply) {

      const id = request.params.id;
      Track.findById({ id })
        .then(track => reply(track))
        .catch(e => reply(e));
    },

    create(request, reply) {

    },

    remove(request, reply) {

    }

};
