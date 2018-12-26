const assert = require("assert");
const { lineCount, count, addFileName } = require("../src/lib.js");

const contents = {
  alphabets: "a\nb\nc\nd\ne\nf\ng",
  numbers: "1\n2\n3\n4\n5\n6\n7"
};

const readFileSync = file => contents[file];

describe("wordCount", () => {
  it("should return the number of Lines of the the string", () => {
    assert.deepEqual(lineCount("hello"), "\t" + 0);
  });
  it("should return the number of lines of the given string", () => {
    assert.deepEqual(lineCount("break\ntime"), "\t" + 1);
  });
});

describe("count", () => {
  it("it should return the number of the lines in a file", () => {
    let input = count("alphabets", readFileSync);
    assert.deepEqual(input, "\t6 alphabets");
  });

  it("it should return the number of lines in the file", () => {
    let input = count("numbers", readFileSync);
    assert.deepEqual(input, "\t6 numbers");
  });
});

describe("addFileName", () => {
  it("it should concate the given string with the given file name", () => {
    assert.deepEqual(addFileName("1", "leela"), "1" + " " + "leela");
  });
});
