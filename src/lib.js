const TAB = "\t";
const NEWLINE = "\n";

const lineCount = function(string) {
  let numberOfLines = string.split("\n").length - 1;
  return numberOfLines;
};

const wordCount = function(string) {
  let numberOfWords = string
    .split(NEWLINE)
    .join(" ")
    .split(" ")
    .filter(x => x !== "").length;
  return numberOfWords;
};

const byteCount = function(string) {
  return string.length;
};

const optionOutput = {
  "-l": lineCount,
  "-w": wordCount,
  "-c": byteCount
};

const allTypesOfCount = function(string) {
  return [lineCount(string), wordCount(string), byteCount(string)];
};

const wc = function(args, readFileSync) {
  let file = args[1] || args[0];
  let content = readFileSync(file, "utf8");
  let option = "-l";
  let count = [];
  if (args[0].startsWith("-")) {
    option = args[0];
    count = optionOutput[option](content);
    return formatOutput([count], file);
  }
  count = allTypesOfCount(content);
  return formatOutput(count, file);
};

const formatOutput = function(counts, file) {
  return `${TAB}${counts.join(TAB)} ${file}`;
};

module.exports = {
  lineCount,
  wc,
  wordCount,
  byteCount,
  formatOutput
};
