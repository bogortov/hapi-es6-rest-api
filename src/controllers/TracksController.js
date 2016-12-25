export default {

  getAll(request, reply) {

    const tracks = [{
      name: "Brightside",
      artist: "The killers"
    }];

    return reply(tracks);
  }

};
