const assert = require("assert");
const {
  isMultipleOptions,
  isSingleOption,
  isTwoOptions,
  sortOptions,
  parseInputs
} = require("../src/parser.js");

describe("isSingleOption", () => {
  it("should return the true if the arguement is -w", () => {
    assert.deepEqual(isSingleOption("-w"), true);
  });

  it("should return the true if the arguement is -c", () => {
    assert.deepEqual(isSingleOption("-c"), true);
  });

  it("should return the true if the arguement is -l", () => {
    assert.deepEqual(isSingleOption("-l"), true);
  });

  it("should return the false if the arguement is other than -l,-c,-w", () => {
    assert.deepEqual(isSingleOption("-m"), false);
  });

  it("should return the false for multiple arguements", () => {
    assert.deepEqual(isSingleOption("-c -w"), false);
  });
});

describe("isMultipleOptions", () => {
  it("should return true for -l -w -c", () => {
    assert.deepEqual(isMultipleOptions(["-l", "-w", "-c"]), true);
  });

  it("should return true for -l -w -c", () => {
    assert.deepEqual(isMultipleOptions(["-l", "-c", "-w"]), true);
  });

  it("should return true for -l -w -c", () => {
    assert.deepEqual(isMultipleOptions(["-c", "-w", "-l"]), true);
  });
  it("should return false for -l -w ", () => {
    assert.deepEqual(isMultipleOptions(["-l", "-w"]), false);
  });
});

describe("isTwoOptons", () => {
  it("should return true if the options are -l,-w", () => {
    assert.deepEqual(isTwoOptions(["-l", "-w"]), true);
  });
});

describe("sortOptions", () => {
  it("should return the sorted options for given input of two types of inouts", () => {
    assert.deepEqual(sortOptions(["-w", "-l"]), ["-l", "-w"]);
    assert.deepEqual(sortOptions(["-wl"]), ["-l", "-w"]);
  });
});

describe("parseOptions", () => {
  it("should retun only elements that starts with -", () => {
    assert.deepEqual(parseInputs(["-l", "-w"]), {
      options: ["-l", "-w"],
      fileNames: []
    });
  });

  it("should retun only elements that starts with '-' shouldn't give other ", () => {
    assert.deepEqual(parseInputs(["-l", "-w", "file1"]), {
      options: ["-l", "-w"],
      fileNames: ["file1"]
    });
  });

  it("should retun only elements that starts with -", () => {
    assert.deepEqual(parseInputs(["-l", "-w"]), {
      options: ["-l", "-w"],
      fileNames: []
    });
  });

  it("should return even for three options together", () => {
    assert.deepEqual(parseInputs(["-lcw"]), {
      options: ["-lcw"],
      fileNames: []
    });
  });

  it("should only return files and options as -lcw for default", () => {
    assert.deepEqual(parseInputs(["file1", "file2"]), {
      options: ["-lcw"],
      fileNames: ["file1", "file2"]
    });
  });
});
