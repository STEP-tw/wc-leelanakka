const assert = require("assert");
const { sortOptions, parseInputs } = require("../src/parser.js");

describe("sortOptions", () => {
  it("should return the sorted options for given input of two types of inouts", () => {
    assert.deepEqual(sortOptions(["w", "l"]), ["l", "w"]);
    assert.deepEqual(sortOptions(["w", "l"]), ["l", "w"]);
    assert.deepEqual(sortOptions(["l", "w", "c"]), ["l", "w", "c"]);
  });
});

describe("parseOptions", () => {
  it("should retun only elements that starts with -", () => {
    assert.deepEqual(parseInputs(["-l", "-w"]), {
      options: ["l", "w"],
      fileNames: []
    });
  });

  it("should retun only elements that starts with '-' shouldn't give other ", () => {
    assert.deepEqual(parseInputs(["-l", "-w", "file1"]), {
      options: ["l", "w"],
      fileNames: ["file1"]
    });
  });

  it("should retun only elements that starts with -", () => {
    assert.deepEqual(parseInputs(["-l", "-w"]), {
      options: ["l", "w"],
      fileNames: []
    });
  });

  it("should return even for three options together", () => {
    assert.deepEqual(parseInputs(["-clw"]), {
      options: ["l", "w", "c"],
      fileNames: []
    });
  });

  it("should only return files and options as -lcw for default", () => {
    assert.deepEqual(parseInputs(["file1", "file2"]), {
      options: ["l", "w", "c"],
      fileNames: ["file1", "file2"]
    });
  });

  it("should retun only elements that starts with -", () => {
    assert.deepEqual(parseInputs(["-l", "-l"]), {
      options: ["l"],
      fileNames: []
    });
  });
});
