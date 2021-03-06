const assert = require("assert");
const {
  lineCount,
  wc,
  wordCount,
  byteCount,
  formatOutput,
  readContent,
  count,
  sumArrays
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
  it("it should return all types of count in a file", () => {
    let input = wc(["alphabets"], readFileSync);
    assert.deepEqual(input, "\t6\t7\t13 alphabets");
  });

  it("with arguments provides line counts and a total for multiple files", () => {
    let input = wc(["-w", "numbers", "alphabets"], readFileSync);
    let expectedOutput = "\t7 numbers\n\t7 alphabets\n\t14 total";
    assert.deepEqual(input, expectedOutput);
  });

  it("it should return the number of lines in the file", () => {
    let input = wc(["numbers"], readFileSync);
    assert.deepEqual(input, "\t6\t7\t13 numbers");
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

  it("should return all types of counts along with the total content ", () => {
    let input = wc(["alphabets", "numbers"], readFileSync);
    let expectedOutput =
      "\t6\t7\t13 alphabets\n\t6\t7\t13 numbers\n\t12\t14\t26 total";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return all types of counts along with the total content for -wlc option", () => {
    let input = wc(["-wlc", "alphabets"], readFileSync);
    let expectedOutput = "\t6\t7\t13 alphabets";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return all types of counts along with the total content for -lwc option", () => {
    let input = wc(["-lwc", "numbers"], readFileSync);
    let expectedOutput = "\t6\t7\t13 numbers";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return all types of counts along with the total content for -lwc option", () => {
    let input = wc(["-w", "-l", "-c", "numbers"], readFileSync);
    let expectedOutput = "\t6\t7\t13 numbers";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return line and word count for -l -w option", () => {
    let input = wc(["-w", "-l", "numbers"], readFileSync);
    let expectedOutput = "\t6\t7 numbers";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return word and byte count for -w -c option", () => {
    let input = wc(["-c", "-w", "numbers"], readFileSync);
    let expectedOutput = "\t7\t13 numbers";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return line and word count for -lw option", () => {
    let input = wc(["-wl", "numbers"], readFileSync);
    let expectedOutput = "\t6\t7 numbers";
    assert.deepEqual(input, expectedOutput);
  });

  it("should return line and word count for -lc option", () => {
    let input = wc(["-cl", "numbers"], readFileSync);
    let expectedOutput = "\t6\t13 numbers";
    assert.deepEqual(input, expectedOutput);
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

describe("readContent", () => {
  it("should return the content of the single file in an array", () => {
    assert.deepEqual(readContent(["alphabets"], readFileSync), [
      "a\nb\nc\nd\ne\nf\ng"
    ]);
  });

  it("should return the content of the multiple files in an array", () => {
    let input = readContent(["alphabets", "numbers"], readFileSync);
    assert.deepEqual(input, ["a\nb\nc\nd\ne\nf\ng", "1\n2\n3\n4\n5\n6\n7"]);
  });
});

describe("countForMultipleFiles", () => {
  it("it should return all types of the contents along with total at the end", () => {
    let input = count(
      ["a\nb\nc\nd\ne\nf\ng", "1\n2\n3\n4\n5\n6\n7"],
      ["alphabets", "numbers"],
      ["line", "word", "byte"]
    );
    let expectedOutput = [
      "\t6\t7\t13 alphabets",
      "\t6\t7\t13 numbers",
      "\t12\t14\t26 total"
    ];
    assert.deepEqual(input, expectedOutput);
  });

  it("it should return word count of the contents along with total at the end", () => {
    let input = count(
      ["a\nb\nc\nd\ne\nf\ng", "1\n2\n3\n4\n5\n6\n7"],
      ["alphabets", "numbers"],
      ["word"]
    );
    let expectedOutput = ["\t7 alphabets", "\t7 numbers", "\t14 total"];
    assert.deepEqual(input, expectedOutput);
  });

  it("it should return line count of the contents along with total at the end", () => {
    let input = count(
      ["a\nb\nc\nd\ne\nf\ng", "1\n2\n3\n4\n5\n6\n7"],
      ["alphabets", "numbers"],
      ["line"]
    );
    let expectedOutput = ["\t6 alphabets", "\t6 numbers", "\t12 total"];
    assert.deepEqual(input, expectedOutput);
  });

  it("it should return byt count of the contents along with total at the end", () => {
    let input = count(
      ["a\nb\nc\nd\ne\nf\ng", "1\n2\n3\n4\n5\n6\n7"],
      ["alphabets", "numbers"],
      ["byte"]
    );
    let expectedOutput = ["\t13 alphabets", "\t13 numbers", "\t26 total"];
    assert.deepEqual(input, expectedOutput);
  });
});

describe("sumArrays", () => {
  it("should return the sum of numbers in an array if given input is as array of arrays", () => {
    assert.deepEqual(sumArrays([1, 2, 3], [4, 5, 6]), [5, 7, 9]);
  });
  it("should return sum for single elements in each array", () => {
    assert.deepEqual(sumArrays([1], [4]), [5]);
  });
});
