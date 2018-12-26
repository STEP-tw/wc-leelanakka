const lineCount = function(string) {
  let noOfLines = string.split("\n").length;
  return "\t" + noOfLines;
};
const count = function(file, fs) {
  let content = fs.readFileSync(file, "utf8");
  return lineCount(content);
};

module.exports = { lineCount, count };
