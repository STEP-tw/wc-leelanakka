const TAB = "\t";
const NEWLINE = "\n";

const lineCount = function(string) {
  let numberOfLines = string.split("\n").length - 1;
  return TAB + numberOfLines;
};

const wordCount = function(string) {
  let numberOfWords = string
    .split(NEWLINE)
    .join(" ")
    .split(" ")
    .filter(x => x !== "").length;
  return TAB + numberOfWords;
};

const wc = function(args, readFileSync) {
  let file = args[1] || args[0];
  let content = readFileSync(file, "utf8");
  let count = lineCount(content);
  if (args[0] == "-w") {
    count = wordCount(content);
  }
  return addFileName(count, file);
};

const addFileName = function(string, file) {
  return `${string} ${file}`;
};

module.exports = { lineCount, wc, addFileName, wordCount };
