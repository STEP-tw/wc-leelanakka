const assert = require("assert");
const { lineCount } = require("../src/lib.js");

describe("wordCount", () => {
  it("should return the number of Lines of the the string", () => {
    assert.deepEqual(lineCount("hello"), "\t" + 1);
  });
  it("should return the number of lines of the given string", () => {
    assert.deepEqual(lineCount("break\ntime"), "\t" + 2);
  });
});
