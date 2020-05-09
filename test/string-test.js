var assert = require('assert');

describe("Test string", function(){
  it("Test slugify", function(){
    const testStr = require("../string/slugify")("Pemerintah 1! ada pejuang");
    assert.equal(testStr, "pemerintah-1-ada-pejuang");
  });
  it("Test number format", function(){
    const testStr = require("../string/number-format")(450000);
    assert.equal(testStr, "450,000");
  });
  it("Test string random", function(){
    const testStr = require("../string/string-random")(8);
    assert.equal(testStr.length, 8);
  });
});