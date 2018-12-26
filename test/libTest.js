const assert = require("assert");
const { lineCount, wc, addFileName, wordCount } = require("../src/lib.js");

const contents = {
  alphabets: "a\nb\nc\nd\ne\nf\ng",
  numbers: "1\n2\n3\n4\n5\n6\n7",
  strings:
    "She obviously\nspends every\nnon-working\nhour in\nthorough personal\nexploration"
};

const readFileSync = file => contents[file];
describe("lineCount", () => {
  it("should return the number of Lines of the the string", () => {
    assert.deepEqual(lineCount("hello"), "\t" + 0);
  });
  it("should return the number of lines of the given string", () => {
    assert.deepEqual(lineCount("break\ntime"), "\t" + 1);
  });
});

describe("wc", () => {
  it("it should return the number of the lines in a file", () => {
    let input = wc(["alphabets"], readFileSync);
    assert.deepEqual(input, "\t6 alphabets");
  });

  it("it should return the number of lines in the file", () => {
    let input = wc(["numbers"], readFileSync);
    assert.deepEqual(input, "\t6 numbers");
  });

  it("should return the number of words and file name if option is -w", () => {
    assert.deepEqual(wc(["-w", "numbers"], readFileSync), "\t7 numbers");
  });

  it("should return the total numeber of words present in the file", () => {
    assert.deepEqual(wc(["-w", "strings"], readFileSync), "\t10 strings");
  });
});

describe("addFileName", () => {
  it("it should concate the given string with the given file name", () => {
    assert.deepEqual(addFileName("1", "leela"), "1" + " " + "leela");
  });
});

describe("wordCount", () => {
  it("should return the number of words present in the string", () => {
    assert.deepEqual(wordCount("leela"), "\t1");
  });
});
