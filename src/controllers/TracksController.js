import Track from '../models/Track';

export default {

  getAll(request, reply) {

    const { limit = 50, page = 0 } = request.query;
    const skip = (page || 0) * limit;

    Track.find({ limit, skip })
      .then(tracks => {
        if (!tracks) {
          return reply().code(404);
        } else {
          return reply(tracks);
        }
      })
      .catch(e => {
        return reply(e).code(500);
      });
  }

};
