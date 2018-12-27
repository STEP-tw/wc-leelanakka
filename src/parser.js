const isSingleOption = function(option) {
  return option == "-c" || option == "-w" || option == "-l";
};

const isMultipleOptions = function(args) {
  return args[2] == "-c" || args[2] == "-w" || args[2] == "-l";
};

module.exports = { isMultipleOptions, isSingleOption };
