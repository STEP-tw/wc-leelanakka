const assert = require("assert");
const {
  lineCount,
  wc,
  wordCount,
  byteCount,
  formatOutput
} = require("../src/lib.js");

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

  it("should return the total number of words present in the file", () => {
    assert.deepEqual(wc(["-w", "strings"], readFileSync), "\t10 strings");
  });

  it("should return the total number of lines present in the file for -l as option", () => {
    assert.deepEqual(wc(["-l", "strings"], readFileSync), "\t5 strings");
  });

  it("should return the total number of characters present in the file for -c as option", () => {
    assert.deepEqual(wc(["-c", "alphabets"], readFileSync), "\t13 alphabets");
  });

});

describe("wordCount", () => {
  it("should return the number of words present in the string", () => {
    assert.deepEqual(wordCount("leela"), "\t1");
  });
});

describe("byteCount", () => {
  it("it should return the number of characters in the string", () => {
    assert.deepEqual(byteCount("hello"), 5);
  });

  it("should return the byte count even for string containing new lines", () => {
    assert.deepEqual(byteCount("break\ntime"), 10);
    assert.deepEqual(byteCount("         "), 9);
  });
});

describe("formatOutput", () => {
  it("should format the output if the single count are in array and file name", () => {
    let input = formatOutput([9], "file");
    let expectedOutput = "\t9 file";
    assert.deepEqual(input, expectedOutput);
  });

  it("should format the output if the multiple counts are in array and file name", () => {
    let input = formatOutput([9, 28, 1998], "file");
    let expectedOutput = "\t9\t28\t1998 file";
    assert.deepEqual(input, expectedOutput);
  });
});
