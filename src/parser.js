const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return isSingleOption(args[2]);
};

const isTwoOptions = function(args) {
  return isSingleOption(args[1]);
};

module.exports = { isMultipleOptions, isSingleOption, isTwoOptions };
