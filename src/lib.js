const lineCount = function(string) {
  let noOfLines = string.split("\n").length - 1;
  return "\t" + noOfLines;
};

const count = function(file, readFileSync) {
  let content = readFileSync(file, "utf8");
  let lines = lineCount(content);
  return addFileName(lines, file);
};

const addFileName = function(string, file) {
  return `${string} ${file}`;
};

module.exports = { lineCount, count ,addFileName};
