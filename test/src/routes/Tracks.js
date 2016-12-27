'use strict';
//libs
import Lab from 'lab';
import Code from 'code';
import server from "../../../src/";
import sinon from "sinon";
import "sinon-as-promised";
import "sinon-mongoose";

//models
import Track from '../../../src/models/Track';

let lab = exports.lab = Lab.script();

let sandbox;
let tracks;

lab.experiment("Tracks routes", function() {

  lab.beforeEach((done) => {
    tracks = [{
      name: "Killers - Brightside",
      duration: 222
    }];
    sandbox = sinon.sandbox.create();
    done();
  });

  lab.afterEach((done) => {
    sandbox.restore();
    done();
  });

  lab.experiment("GET /tracks", () => {

    lab.test("Should return the list of songs with 200 status", (done) => {
      const options = {
        method: "GET",
        url: "/tracks?page=0&limit=1"
      };

      sandbox.mock(Track)
        .expects('find')
        .chain('exec')
        .resolves(tracks);

      server.inject(options, (response) => {
        Code.expect(response.result.length).to.equal(1);
        Code.expect(response.statusCode).to.equal(200);
        done();
      });

    });

    lab.test("Should return 500 mongoerror", (done) => {
      const options = {
        method: "GET",
        url: "/tracks?page=0&limit=1"
      };

      sandbox.mock(Track)
        .expects('find')
        .chain('exec')
        .rejects({});

      server.inject(options, (response) => {
        Code.expect(response.statusCode).to.equal(500);
        done();
      });

    });

    lab.test("Should return 404 error", (done) => {
      const options = {
        method: "GET",
        url: "/tracks?page=0&limit=1"
      };

      sandbox.mock(Track)
        .expects('find')
        .chain('exec')
        .resolves(null);

      server.inject(options, (response) => {
        Code.expect(response.statusCode).to.equal(404);
        done();
      });

    });
  });

});
