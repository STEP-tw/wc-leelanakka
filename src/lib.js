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

const optionOutput = {
  "-l": lineCount,
  "-w": wordCount,
  "-c": byteCount
};

const allTypesOfCount = function(string) {
  return [lineCount(string), wordCount(string), byteCount(string)];
};

const readContent = function(files, readFileSync) {
  return files.map(fileName => readFileSync(fileName, "utf8"));
};

const countForMultipleFiles = function(string, files) {
  let output = string.map(x => allTypesOfCount(x));
  let totalCount = output.reduce(sumArrays);
  output = output.map((x, i) => formatOutput(x, files[i]));
  output.push(formatOutput(totalCount, "total"));
  return output;
};

const sumArrays = function(array1, array2) {
  return array1.map((x, i) => x + array2[i]);
};

const wc = function(args, readFileSync) {
  let file = args;
  let content = readContent(file, readFileSync);
  let option = "-l";

  if (args[0].startsWith("-")) {
    option = args[0];
    file = args.slice(1);
    content = readContent(file, readFileSync).join(NEWLINE);
    let count = optionOutput[option](content);
    return formatOutput([count], file);
  }

  if (file.length > 1) {
    return countForMultipleFiles(content, file).join(NEWLINE);
  }

  let count = allTypesOfCount(content.join(NEWLINE));
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
  formatOutput,
  readContent,
  countForMultipleFiles,
  sumArrays
};
