var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var getUsers = require('../routes/getUsers');

describe("Routes", function() {
  describe("GET Users", function() {

      it("should respond", function() {
        var req,res,spy;

        req = res = {};
        spy = res.send = sinon.spy();

        getUsers(req, res);
        expect(spy.calledOnce).to.equal(true);
      });     

  });
  describe("GET Users", function() {

    it("should return expected object", function() {
      let req,res,spy;

      let response;
      res = { 
        send: (val) => response = val
      }

      getUsers(req, res);
      expect(response).to.deep.equal([
        { name: 'bob', age: 10 },
        { name: 'jim', age: 12 }
    ]);
    });     

});
});