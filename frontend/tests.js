/** 
 * Unit tests using Mocha.
 * To run tests: $ yarn mocha tests.js
 * 
 * */ 
var assert = require('chai').assert;
var sample = require('./sample');

describe ('sample', function() {
  it("sample should return running a test!", function() {
    assert.equal(sample(), "running a test!");
  });

  it("sample should return String for type!", function() {
    assert.typeOf(sample(), 'String');
  });
});