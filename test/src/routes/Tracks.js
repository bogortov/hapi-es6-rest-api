'use strict';

import Lab from 'lab';
import Code from 'code';
import server from "../../../src/";
import sinon from "sinon";
import "sinon-as-promised";

let lab = exports.lab = Lab.script();

let sandbox;

lab.experiment("Tracks routes", function() {

  lab.beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  lab.afterEach((done) => {
    sandbox.restore();
    done();
  });

  lab.experiment("GET /tracks", () => {

    lab.test("Should return the list of songs", (done) => {
      const options = {
        method: "GET",
        url: "/tracks"
      };

      server.inject(options, (response) => {
        const result = response.result;
        Code.expect(result.length).to.equal(4);
        console.log(result);
        done();
      });

    });
  });

});
