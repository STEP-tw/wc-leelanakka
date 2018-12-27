const TAB = "\t";
const NEWLINE = "\n";

const lineCount = function(string) {
  let numberOfLines = string.split(NEWLINE).length - 1;
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

const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return args[1] == "-c" || args[1] == "-w" || args[1] == "-l";
};

const wc = function(args, readFileSync) {
  let file = args;
  let option = "-l";

  if (isMultipleOptions(args)) {
    file = args.slice(-1);
  }

  if (isSingleOption(args[0])) {
    option = args[0];
    file = args.slice(1);
    let content = readContent(file, readFileSync);
    if (file.length > 1) {
      return countForMultipleFiles(content, file, option).join(NEWLINE);
    }
    return countForMultipleFiles(content, file, option).join(NEWLINE);
  }

  if (args[0].startsWith("-")) {
    file = args.slice(1);
  }

  let content = readContent(file, readFileSync);
  return countForMultipleFiles(content, file, "default").join(NEWLINE);
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
  isSingleOption
};
