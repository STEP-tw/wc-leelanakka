const { isSingleOption, parseInputs } = require("./parser.js");
const { TAB, NEWLINE, SPACE, EMPTY, ENCODING_TYPE } = require("./constants.js");

const lineCount = function(string) {
  let numberOfLines = string.split(NEWLINE).length - 1;
  return numberOfLines;
};

const isNotEmpty = x => x !== EMPTY;

const wordCount = function(string) {
  let numberOfWords = string
    .split(NEWLINE)
    .join(SPACE)
    .split(SPACE)
    .filter(isNotEmpty).length;
  return numberOfWords;
};

const byteCount = function(string) {
  return string.length;
};

const allTypesOfCount = function(string, options) {
  return options.map(x => optionOutput[x](string));
};

const optionOutput = {
  line: lineCount,
  word: wordCount,
  byte: byteCount
};

const readContent = function(files, readFileSync) {
  return files.map(fileName => readFileSync(fileName, ENCODING_TYPE));
};

const count = function(string, files, option) {
  let output = string.map(x => {
    return allTypesOfCount(x, option);
  });
  let totalCount = output.reduce(sumArrays);
  output = output.map((x, i) => formatOutput(x, files[i]));
  if (files.length > 1) {
    output.push(formatOutput(totalCount, "total"));
  }
  return output;
};

const sumArrays = function(array1, array2) {
  return array1.map((x, i) => x + array2[i]);
};

const wc = function(args, readFileSync) {
  let { options, fileNames } = parseInputs(args);
  let content = readContent(fileNames, readFileSync);
  return count(content, fileNames, options).join(NEWLINE);
};

const formatOutput = function(counts, file) {
  return `${TAB}${counts.join(TAB)} ${file}`;
};

module.exports = {
  lineCount,
  wc,
  wordCount,
  byteCount,
  formatOutput,
  readContent,
  count,
  sumArrays,
  isSingleOption
};
