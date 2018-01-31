var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var proxyquire =  require('proxyquire')
// var getBooks = require('../routes/getBooks');

describe("Routes", function() {
  describe("GET Books", function() {

      it("should respond", function() {
        let apiStub = {};
        var getBooks = proxyquire('../routes/getBooks',
            { '../books/books.api': apiStub });
        apiStub.getBooks = function () {
            return ['bar'];
        };
        let resp, req;
        const res = {
            send: v => resp = v
        }
        getBooks(req, res);
        expect(resp).to.deep.equal(['bar']);
      });     

  });
});