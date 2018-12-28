const { isSingleOption, sortOptions, parseInputs } = require("./parser.js");

const TAB = "\t";
const NEWLINE = "\n";
const SPACE = " ";
const EMPTY = "";

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

const allTypesOfCount = function(string) {
  return [lineCount(string), wordCount(string), byteCount(string)];
};

const optionOutput = {
  "-l": lineCount,
  "-w": wordCount,
  "-c": byteCount,
  default: allTypesOfCount
};

const readContent = function(files, readFileSync) {
  return files.map(fileName => readFileSync(fileName, "utf8"));
};

const countForMultipleFiles = function(string, files, option) {
  let output = string.map(x => {
    if (option == "default") return optionOutput[option](x);
    return [optionOutput[option](x)];
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

const countForTwoOptions = function(string, files, options) {
  let output = string.map((x, i) => [
    optionOutput[options[i]](x),
    optionOutput[options[i + 1]](x)
  ]);
  output = output.map((x, i) => formatOutput(x, files[i]));
  return output;
};

const wc = function(args, readFileSync) {
  let { options, fileNames } = parseInputs(args);

  if (options.length == 3 || options[0].length == 4) {
    let content = readContent(fileNames, readFileSync);
    return countForMultipleFiles(content, fileNames, "default").join(NEWLINE);
  }

  if (options.length == 2 || options[0].length == 3) {
    options = sortOptions(options);
    let content = readContent(fileNames, readFileSync);
    return countForTwoOptions(content, fileNames, options).join(NEWLINE);
  }

  if (isSingleOption(args[0])) {
    let content = readContent(fileNames, readFileSync);
    return countForMultipleFiles(content, fileNames, options).join(NEWLINE);
  }

  let content = readContent(fileNames, readFileSync);
  return countForMultipleFiles(content, fileNames, "default").join(NEWLINE);
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
  countForMultipleFiles,
  sumArrays,
  isSingleOption,
  countForTwoOptions
};
